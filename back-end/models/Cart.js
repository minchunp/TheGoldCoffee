const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema(
  {
    id_order: { type: ObjectId }, // khóa chính
    id_user: { type: ObjectId, ref: "users" }, // khóa ngoại tới bảng User
    id_promotion: { type: ObjectId, ref: "promotions" },
    total_order: { type: Number }, // tổng đơn hàng
    discount: { type: Number },
    name_user: { type: String }, // tên người dùng
    phoneNumber_user: { type: String }, // số điện thoại người dùng
    address_user: { type: String }, // địa chỉ người dùng
    note_order: { type: String },
    date_order: { type: Date }, // ngày đặt hàng
    rating_order: { type: Number, default: null }, // đánh giá đơn hàng (tùy chọn)
    feedback_order: { type: String, default: "" }, // phản hồi đơn hàng (tùy chọn)
    isFeedback_order: { type: Boolean, default: false }, // đã có phản hồi chưa

    status_order: { type: String }, // trạng thái đơn hàng
    method_pay_type: { type: String },
    method_pay_status: { type: String },
    app_trans_id: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
