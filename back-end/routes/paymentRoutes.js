// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-order", paymentController.createPaymentOrder);
router.post("/callback", paymentController.handleZaloPayCallback);
router.get("/query/:app_trans_id", paymentController.queryPaymentStatus);

module.exports = router;
