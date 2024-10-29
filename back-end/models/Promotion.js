const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const promotionSchema = new Schema(
  {
    id_promotion: { type: ObjectId }, // khóa chính
    name_promotion: { type: String }, // tên khuyến mãi
    content_promotion: { type: String }, // nội dung khuyến mãi
    value_promotion: { type: Number }, // giá trị khuyến mãi
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.Promotion || mongoose.model("Promotion", promotionSchema);
