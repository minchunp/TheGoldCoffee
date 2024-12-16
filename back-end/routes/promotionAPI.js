const express = require("express");
const router = express.Router();
const modelPromotion = require("../models/Promotion");

// http://localhost:3001/promotionsAPI/checkcode/:code
router.get("/checkcode/:code", async (req, res, next) => {
  try {
    const code = req.params.code;
    const data = await modelPromotion.findOne({ code_promotion: code });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/listPromotion", async (req, res, next) => {
  try {
    // Thêm điều kiện filter quantity_promotion > 0 và code_promotion !== "NONEKM"
    const data = await modelPromotion.find({
      quantity_promotion: { $gt: 0 }, // quantity_promotion > 0
      code_promotion: { $ne: "NONEKM" }, // Ngoại trừ code_promotion = "NONEKM"
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.get("/search", async (req, res) => {
  const { keyword } = req.query; // Lấy từ khóa tìm kiếm từ query string

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  try {
    // Tìm kiếm mã khuyến mãi theo tên và mô tả có chứa từ khóa
    const promotions = await modelPromotion
      .find({
        code_promotion: { $regex: keyword, $options: "i" },
        quantity_promotion: { $gt: 0 }, // Chỉ lấy mã còn hàng
        expiry_promotion: { $gte: new Date().toISOString() }, // Chỉ lấy mã còn hiệu lực
      })
      .limit(5); // Giới hạn kết quả trả về

    if (promotions.length === 0) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy mã khuyến mãi", suggestions: [] });
    }

    res.json({
      suggestions: promotions.map((promotion) => ({
        code_promotion: promotion.code_promotion,
        name_promotion: promotion.name_promotion,
        content_promotion: promotion.content_promotion,
        value_promotion: promotion.value_promotion,
      })),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tìm kiếm mã khuyến mãi" });
  }
});

module.exports = router;
