// zalopay/zalopayService.js
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const { ZALO_APP_ID, ZALO_KEY1, ZALO_ENDPOINT_CREATE, ZALO_ENDPOINT_QUERY } =
  process.env;

// Hàm tạo đơn hàng
exports.createZaloPayOrder = async (orderId, totalAmount) => {
  const appTransId = `${Date.now()}`;
  const embedData = {}; // Dữ liệu nhúng
  const items = [{}]; // Sản phẩm trong đơn hàng
  const param = {
    app_id: ZALO_APP_ID,
    app_user: "user123", // ID người dùng
    app_time: Math.floor(Date.now() / 1000), // Thời gian tạo đơn
    amount: totalAmount,
    app_trans_id: `${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}_${appTransId}`,
    embed_data: JSON.stringify(embedData),
    item: JSON.stringify(items),
    description: `Thanh toán đơn hàng #${orderId}`,
    bank_code: "zalopayapp",
  };

  const data = `${param.app_id}|${param.app_trans_id}|${param.app_user}|${param.amount}|${param.app_time}|${param.embed_data}|${param.item}`;
  param.mac = crypto.createHmac("sha256", ZALO_KEY1).update(data).digest("hex");

  try {
    const response = await axios.post(ZALO_ENDPOINT_CREATE, param);
    return response.data.order_url; // Trả về link thanh toán ZaloPay
  } catch (error) {
    console.error("Lỗi tạo đơn hàng ZaloPay:", error);
    throw error;
  }
};

// Hàm truy vấn trạng thái thanh toán
exports.queryZaloPayOrderStatus = async (appTransId) => {
  const param = {
    app_id: ZALO_APP_ID,
    app_trans_id: appTransId,
  };

  const data = `${param.app_id}|${param.app_trans_id}|${ZALO_KEY1}`;
  param.mac = crypto.createHmac("sha256", ZALO_KEY1).update(data).digest("hex");

  try {
    const response = await axios.post(ZALO_ENDPOINT_QUERY, param);
    return response.data;
  } catch (error) {
    console.error("Lỗi truy vấn trạng thái thanh toán:", error);
    throw error;
  }
};
