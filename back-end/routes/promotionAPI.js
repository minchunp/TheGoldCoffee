const express = require("express");
const router = express.Router();
const modelPromotion = require("../models/Promotion");

// http://localhost:3001/promotionsAPI/checkcode/:code
router.get("/checkcode/:code", async (req, res, next) => {
  try {
    const code = req.params.code;
    const data = await modelPromotion.findOne({ code_promotion: code });

    // Kiểm tra quantity_promotion lớn hơn 0
    if (data && data.quantity_promotion > 0) {
      res.json(data);
    } else {
      res.status(200).json({ message: "Khuyến mãi đã hết lượt dùng." });
    }
  } catch (err) {
    next(err);
  }
});

// http://localhost:3001/promotionsAPI/use/:code
router.get("/use/:code", async (req, res, next) => {
  try {
    const code = req.params.code;
    const data = await modelPromotion.findOne({ code_promotion: code });

    if (!data) {
      return res.status(404).json({ message: "Mã khuyến mãi không hợp lệ." });
    }

    // Kiểm tra nếu quantity_promotion lớn hơn 0, giảm đi 1
    if (data.quantity_promotion > 0) {
      data.quantity_promotion -= 1;

      // Lưu lại thay đổi vào cơ sở dữ liệu
      await data.save();

      res.json({ message: "Khuyến mãi đã được áp dụng.", data });
    } else {
      res.status(400).json({ message: "Khuyến mãi đã hết lượt sử dụng." });
    }
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

module.exports = router;
