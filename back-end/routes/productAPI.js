var express = require("express");
var router = express.Router();
var modelProduct = require("../models/Product");
var modelProductDetail = require("../models/Product_detail");
const modelTopping = require("../models/Topping");

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

    return res.status(200).json({
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

// Lấy danh sách sản phẩm theo danh mục
// http://localhost:3001/productsAPI/productsByCategory/:categoryId
router.get("/productsByCategory/:categoryId", async function (req, res, next) {
  try {
    var categoryId = req.params.categoryId;
    var data = await modelProduct.find({ id_cate: categoryId });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong danh mục này." });
    }

    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy sản phẩm theo danh mục." });
  }
});

// Lấy danh sách sản phẩm theo lượt bán, sắp xếp từ cao xuống thấp, và giới hạn số lượng
// http://localhost:3001/productsAPI/productsBySales?limit=10
router.get("/productsBySales", async function (req, res, next) {
  try {
    var limit = parseInt(req.query.limit) || 10; // Lấy giới hạn từ query params, mặc định là 10
    var data = await modelProduct
      .find()
      .sort({ salesVolume_pro: -1 }) // Sắp xếp lượt bán từ cao xuống thấp
      .limit(limit); // Giới hạn số lượng sản phẩm cần lấy

    if (data.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo lượt bán:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy sản phẩm theo lượt bán." });
  }
});

// http://localhost:3001/productsAPI/proWithTopping/:id
router.get("/proWithTopping/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    var data = await modelProductDetail.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy." });
    }
    // // lấy product
    const id_pro = data.id_pro;
    var product = await modelProduct.findById(id_pro);

    // lấy list topping
    const list_id_topping = data.list_topping;

    console.log("here", list_id_topping);
    const list_topping = [];
    for (let i = 0; i < list_id_topping.length; i++) {
      console.log("id", list_id_topping[i]);
      const topping = await modelTopping.findById(list_id_topping[i]);
      console.log("toping: ", topping);
      list_topping.push(topping);
    }
    console.log(list_topping);

    // Trả về thông tin sản phẩm và topping
    return res.status(200).json({
      product: product,
      toppings: list_topping,
    });

    res.json(list_topping);
  } catch (error) {
    console.error("Lỗi khi lấy data", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy data" });
  }
});

module.exports = router;
