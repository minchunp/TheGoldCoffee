const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    code_promotion: { type: String },
    name_promotion: { type: String },
    content_promotion: { type: String },
    value_promotion: { type: Number },
    expiry_promotion: { type: String },
    quantity_promotion: { type: Number },
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.promotion || mongoose.model("promotion", promotionSchema);
