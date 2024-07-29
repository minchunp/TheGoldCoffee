var express = require("express");
var router = express.Router();
var modelProduct = require("../models/Product");

// Lấy danh sách tất cả sản phẩm
// http://localhost:3000/productsAPI/listProduct
router.get("/listProduct", async function (req, res, next) {
  try {
    var data = await modelProduct.find();
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm." });
  }
});

// Lấy chi tiết sản phẩm theo id
// http://localhost:3000/productsAPI/detailProduct/:id
router.get("/detailProduct/:id", async function (req, res, next) {
  try {
    var idsp = req.params.id;
    var data = await modelProduct.findById(idsp);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy chi tiết sản phẩm." });
  }
});

// Xóa sản phẩm theo id
// http://localhost:3000/productsAPI/deleteProduct/:id
router.delete("/deleteProduct/:id", async function (req, res, next) {
  try {
    var idsp = req.params.id;
    const deletedProduct = await modelProduct.findByIdAndDelete(idsp);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa." });
    }

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công.", deletedProduct });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xóa sản phẩm." });
  }
});

// Cập nhật sản phẩm theo id
// http://localhost:3000/productsAPI/updateProduct/:id
router.put("/updateProduct/:id", async function (req, res, next) {
  try {
    var idsp = req.params.id;
    const updatedProduct = await modelProduct.findByIdAndUpdate(
      idsp,
      req.body,
      { new: true } // Trả về document sau khi cập nhật
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật." });
    }

    return res
      .status(200)
      .json({
        message: "Cập nhật thông tin sản phẩm thành công.",
        updatedProduct,
      });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật sản phẩm." });
  }
});

// Chi tiết sản phẩm theo giá < input
// http://localhost:3000/productsAPI/detailProductFind_price?price=......
router.get("/detailProductFind_price", async function (req, res, next) {
  try {
    var price = req.query.price;
    var data = await modelProduct.find({ price: { $lt: price } });
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi tìm sản phẩm theo giá:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tìm sản phẩm theo giá." });
  }
});

// Chi tiết sản phẩm theo giá từ X đến Y
// http://localhost:3000/productsAPI/detailProductFind_priceXY?priceX=...&priceY=......
router.get("/detailProductFind_priceXY", async function (req, res, next) {
  try {
    var priceX = req.query.priceX;
    var priceY = req.query.priceY;
    var data = await modelProduct.find({
      price: { $gte: priceX, $lte: priceY },
    });
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi tìm sản phẩm theo khoảng giá:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tìm sản phẩm theo khoảng giá." });
  }
});

// Chi tiết sản phẩm có tên chứa từ khóa
// http://localhost:3000/productsAPI/detailProductFind_name?name=......
router.get("/detailProductFind_name", async function (req, res, next) {
  try {
    var nameKeyword = req.query.name;
    const regex = new RegExp(nameKeyword, "i");
    var data = await modelProduct.find({ name: { $regex: regex } });
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi tìm sản phẩm theo tên:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi tìm sản phẩm theo tên." });
  }
});

module.exports = router;
