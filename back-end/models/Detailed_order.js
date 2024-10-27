const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const detailedOrderSchema = new Schema(
  {
    id_detailedOrder: { type: ObjectId }, // khóa chính
    id_pro: { type: String }, // khóa ngoại tới bảng Product
    id_order: { type: String }, // khóa ngoại tới bảng Order
    quantity_detailedOrder: { type: Number }, // số lượng sản phẩm trong chi tiết đơn hàng
    size_detailedOrder: { type: String, required: false }, // kích thước của sản phẩm, không bắt buộc
    price_detailedOrder: { type: Number }, // giá của sản phẩm trong chi tiết đơn hàng
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.DetailedOrder ||
  mongoose.model("DetailedOrder", detailedOrderSchema);
