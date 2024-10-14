const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; // sửa lại để sử dụng ObjectId chính xác

const categorySchema = new Schema(
  {
    _id: { type: ObjectId, auto: true }, // khóa chính tự động tạo ObjectId
    img_cate: {
      type: String,
      required: true,
      trim: true,
    },
    name_cate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    status_cate: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.Category || mongoose.model("categorie", categorySchema);
