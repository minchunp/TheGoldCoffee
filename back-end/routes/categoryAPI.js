var express = require("express");
var axios = require("axios");
var router = express.Router();
module.exports = router;

var modelCategory = require("../models/Category");

// Lấy danh sách tất cả danh mục
// http://localhost:3000/CategorysAPI/listCategory
router.get("/listCategory", async function (req, res, next) {
  try {
    var data = await modelCategory.find();
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy danh sách danh mục." });
  }
});

// Lấy danh mục theo ID
// http://localhost:3000/CategorysAPI/getCategory/:id
router.get("/getCategory/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    var data = await modelCategory.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy danh mục." });
    }
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh mục." });
  }
});

module.exports = router;
