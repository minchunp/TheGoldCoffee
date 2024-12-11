var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController"); // trỏ vào file bên controller

router.post("/login", authController.login); //gọi hàm tương ứng trong file controller
router.post("/register", authController.register);


module.exports = router;
