var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");



router.post("/login", authController.login);
router.post("/sendVerificationCode", authController.sendVerificationCode);
router.post("/sendVeriCodepass", authController.forgot);
router.post("/register", authController.register);



module.exports = router;
