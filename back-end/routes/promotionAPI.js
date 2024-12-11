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

module.exports = router;
