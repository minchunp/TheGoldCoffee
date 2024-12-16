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

module.exports = router;
