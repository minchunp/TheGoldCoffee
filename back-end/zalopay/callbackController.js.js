// zalopay/callbackController.js
const crypto = require("crypto");
require("dotenv").config();

const { ZALO_KEY2 } = process.env;

exports.handlePaymentCallback = (req, res) => {
  const cbdata = req.body;
  const dataStr = cbdata.data;
  const reqMac = cbdata.mac;

  const mac = crypto
    .createHmac("sha256", ZALO_KEY2)
    .update(dataStr)
    .digest("hex");

  if (reqMac !== mac) {
    return res
      .status(400)
      .json({ return_code: -1, return_message: "MAC không khớp" });
  }

  // Giải mã dữ liệu callback
  const dataJson = JSON.parse(dataStr);
  console.log("Cập nhật trạng thái đơn hàng:", dataJson.app_trans_id);

  // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu nếu thanh toán thành công
  if (dataJson.result_code === 1) {
    // Cập nhật đơn hàng là đã thanh toán thành công
    // Bạn có thể cập nhật trạng thái trong cơ sở dữ liệu của bạn ở đây.
    console.log(`Đơn hàng ${dataJson.app_trans_id} đã thanh toán thành công`);
  }

  return res.status(200).json({ return_code: 1, return_message: "success" });
};
