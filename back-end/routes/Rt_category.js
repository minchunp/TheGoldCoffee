var express = require("express");
var router = express.Router();

const categoryController = require("../controllers/categorysController");

// Tạo mới danh mục
router.post("/add", categoryController.create);

// Cập nhật danh mục theo ID
router.put("/update/:id", categoryController.update);

// Xóa danh mục theo ID
router.delete("/delete/:id", categoryController.delete);

module.exports = router;
