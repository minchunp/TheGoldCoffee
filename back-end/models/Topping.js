const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToppingSchema = new Schema(
  {
    id_cate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Tham chiếu đến collection 'Category'
      required: true,
    },
    img_topping: {
      type: String,
      required: true,
    },
    name_topping: {
      type: String,
      required: true,
    },
    price_topping: {
      type: Number,
      required: true,
    },
    status_topping: {
      type: String,
      enum: ["0", "1"], // Giả định rằng status chỉ có thể là '0' hoặc '1'
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model("Topping", ToppingSchema);
