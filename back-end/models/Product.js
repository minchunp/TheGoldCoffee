const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // sửa lại để sử dụng ObjectId chính xác

const productSchema = new Schema(
  {
    _id: { type: ObjectId, auto: true }, // khóa chính tự động tạo ObjectId
    id_cate: {
      type: ObjectId,
      required: true,
      ref: "Category", // Liên kết với bảng Category
    },
    img_pro: {
      type: String,
      required: true,
      trim: true,
      default: "chua_co_anh", // Giá trị mặc định
    },
    name_pro: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100, // Độ dài tối đa cho tên sản phẩm
    },
    price_pro: {
      type: Number,
      required: true,
    },
    sale_pro: {
      type: Number,
      default: 0, // Giá trị mặc định cho giảm giá
    },
    disc_pro: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, // Độ dài tối đa cho mô tả sản phẩm
    },
    salesVolume_pro: {
      type: Number,
      default: 0, // Giá trị mặc định cho số lượng bán
    },
    status_pro: {
      type: String,
      required: true,
      default: "1", // Giá trị mặc định cho trạng thái sản phẩm
    },
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.Product || mongoose.model("product", productSchema);
