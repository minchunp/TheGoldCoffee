const express = require("express");
const router = express.Router();
const modelTopping = require("../models/Topping");
const modelCategory = require("../models/Category");

// Upload middleware
const upload = require("../Upload");

// Upload image
router.post("/upload", [upload.single("image")], async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.json({ status: 0, link: "" });
    } else {
      const url = `http://localhost:3000/images/${file.filename}`;
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log("Upload image error: ", error);
    return res.json({ status: 0, link: "" });
  }
});

// Lấy danh sách tất cả topping
// http://localhost:3000/toppingsAPI/listTopping
router.get("/listTopping", async (req, res, next) => {
  try {
    const data = await modelTopping.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Lấy chi tiết topping theo ID
// http://localhost:3000/toppingsAPI/detailTopping/:id
router.get("/detailTopping/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await modelTopping.findById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Tạo mới topping
// http://localhost:3000/toppingsAPI/create
router.post("/create", async (req, res, next) => {
  try {
    const {
      id_cate,
      img_topping,
      name_topping,
      price_topping,
      status_topping,
    } = req.body;
    const newTopping = new modelTopping({
      id_cate,
      img_topping,
      name_topping,
      price_topping,
      status_topping,
    });
    const savedTopping = await newTopping.save();
    res.status(201).json({ message: "Tạo topping thành công.", savedTopping });
  } catch (err) {
    next(err);
  }
});

// Cập nhật topping
// http://localhost:3000/toppingsAPI/update/:id
router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTopping = await modelTopping.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTopping) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy topping để cập nhật." });
    }
    res
      .status(200)
      .json({ message: "Cập nhật topping thành công.", updatedTopping });
  } catch (err) {
    next(err);
  }
});

// Xóa topping
// http://localhost:3000/toppingsAPI/delete/:id
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedTopping = await modelTopping.findByIdAndDelete(id);
    if (!deletedTopping) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy topping để xóa." });
    }
    res
      .status(200)
      .json({ message: "Xóa topping thành công.", deletedTopping });
  } catch (err) {
    next(err);
  }
});

// Lấy topping theo price < input
// http://localhost:3000/toppingsAPI/detailToppingFind_price?price=......
router.get("/detailToppingFind_price", async (req, res, next) => {
  try {
    const price = req.query.inputPrice;
    const data = await modelTopping.find({ price_topping: { $lt: price } });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Lấy topping theo price từ X đến Y
// http://localhost:3000/toppingsAPI/detailToppingFind_priceXY?priceX=......&priceY=......
router.get("/detailToppingFind_priceXY", async (req, res, next) => {
  try {
    const priceX = req.query.priceX;
    const priceY = req.query.priceY;
    const data = await modelTopping.find({
      price_topping: { $gte: priceX, $lte: priceY },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Lấy topping theo tên có chứa từ khóa
// http://localhost:3000/toppingsAPI/detailToppingFind_name?name=......
router.get("/detailToppingFind_name", async (req, res, next) => {
  try {
    const name = req.query.name;
    const regex = new RegExp(name, "i");
    const data = await modelTopping.find({ name_topping: { $regex: regex } });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
