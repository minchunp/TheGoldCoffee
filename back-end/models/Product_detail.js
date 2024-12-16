const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productWithTopping = new Schema(
  {
    _id: { type: ObjectId, auto: true }, // Khóa chính tự động tạo ObjectId
    id_pro: {
      type: ObjectId,
      required: true,
      ref: "product",
    },
    list_topping: [
      {
        type: ObjectId,
        ref: "Topping",
      },
    ],
  },
  { versionKey: false }
);

module.exports =
  mongoose.models.product_detail ||
  mongoose.model("product_detail", productWithTopping);
