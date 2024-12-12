// Node v10.15.3
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const express = require("express"); // npm install express
const bodyParser = require("body-parser"); // npm install body-parser
const moment = require("moment"); // npm install moment
const qs = require("qs");
var modelOrder = require("../models/Cart");

// var express = require("express");
var router = express.Router();

// const app = express();

// APP INFO, STK TEST: 4111 1111 1111 1111
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

router.use(express.json());

/**
 * methed: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/create
 * Real	POST	https://openapi.zalopay.vn/v2/create
 * description: tạo đơn hàng, thanh toán
 */
router.post("/payment", async (req, res) => {
  const { amount, description, tempAppTransId, title } = req.body;

  // Kiểm tra giá trị đầu vào
  if (!amount || !description || !tempAppTransId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Dữ liệu embed_data cho URL redirect
  const embed_data = {
    redirecturl: "http://localhost:3000/inforCustomer",
  };

  // Tạo mã giao dịch ngẫu nhiên
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(),
    item: "[]", // Danh sách sản phẩm, để trống nếu không dùng
    embed_data: JSON.stringify(embed_data),
    amount: amount, // Số tiền thanh toán
    callback_url:
      "https://6eef-42-113-249-253.ngrok-free.app/zaloPayAPI/callback",
    description: description, // Nội dung giao dịch
    bank_code: "", // Để trống nếu không yêu cầu ngân hàng cụ thể
    title: title || "Merchant Default Title", // Tiêu đề mặc định nếu không truyền
  };

  // Cập nhật mã giao dịch mới cho đơn hàng trong DB
  try {
    await modelOrder.findOneAndUpdate(
      { app_trans_id: tempAppTransId }, // Tìm theo mã giao dịch tạm thời
      { app_trans_id: order.app_trans_id }, // Cập nhật mã giao dịch mới
      { new: true } // Trả về tài liệu đã cập nhật
    );
  } catch (err) {
    console.error("Lỗi cập nhật DB:", err);
    return res.status(500).json({ message: "Database update error" });
  }

  // Tạo chữ ký HMAC (mac) cho yêu cầu
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  // Gửi yêu cầu tới ZaloPay
  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    if (result.data && result.data.order_url) {
      return res.status(200).json({ order_url: result.data.order_url });
    } else {
      console.error("Phản hồi không hợp lệ từ ZaloPay:", result.data);
      return res.status(500).json({ message: "Invalid response from ZaloPay" });
    }
  } catch (error) {
    console.error("Lỗi kết nối ZaloPay:", error);
    return res.status(500).json({ message: "ZaloPay connection error" });
  }
});

/**
 * method: POST
 * description: callback để Zalopay Server call đến khi thanh toán thành công.
 * Khi và chỉ khi ZaloPay đã thu tiền khách hàng thành công thì mới gọi API này để thông báo kết quả.
 */
router.post("/callback", async (req, res) => {
  console.log("HELLO CALLBACK");
  let result = {};
  console.log(req.body);
  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      const dataJson = JSON.parse(dataStr);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      // Cập nhật trạng thái đơn hàng trong MongoDB
      const appTransId = dataJson["app_trans_id"];
      console.log("app_trans_id: " + appTransId);
      const updatedOrder = await modelOrder.findOneAndUpdate(
        { method_pay_status: "chưa thanh toán", app_trans_id: appTransId }, // Tìm đơn hàng
        { method_pay_status: "đã thanh toán" }, // Cập nhật trạng thái
        { new: true } // Trả về tài liệu đã cập nhật
      );

      if (updatedOrder) {
        console.log("Order updated:", updatedOrder);
        result.return_code = 1;
        result.return_message = "success";
      } else {
        console.log("Order not found or already updated.");
        result.return_code = 0;
        result.return_message = "Order not found.";
      }
    }
  } catch (ex) {
    console.log("lỗi:::" + ex.message);
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

/**
 * method: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/query
 * Real	POST	https://openapi.zalopay.vn/v2/query
 * description:
 * Khi user thanh toán thành công,
 * ZaloPay sẽ gọi callback (notify) tới merchant để merchant cập nhật trạng thái
 * đơn hàng Thành Công trên hệ thống. Trong thực tế callback có thể bị miss do lỗi Network timeout,
 * Merchant Service Unavailable/Internal Error...
 * nên Merchant cần hiện thực việc chủ động gọi API truy vấn trạng thái đơn hàng.
 */

router.post("/check-status-order", async (req, res) => {
  const { app_trans_id } = req.body;

  let postData = {
    app_id: config.app_id,
    app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    console.log(result.data);
    return res.status(200).json(result.data);
    /**
     * kết quả mẫu
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
  } catch (error) {
    console.log("lỗi");
    console.log(error);
  }
});

module.exports = router;
