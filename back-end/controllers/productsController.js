var modelProduct = require("../models/Product");
var modelCategory = require("../models/Category");

class ProductsController {
  // product/listproduct
  async index(req, res, next) {
    try {
      var data = await modelProduct.find();
      const sttArray = [];
      data.forEach((item, index) => {
        sttArray.push(index + 1);
      });
      res.render("listproduct", {
        layout: false,
        data: data,
        sttArray: sttArray,
      });
    } catch (err) {
      next(err);
    }
  }

  // product/delete/id
  async delete(req, res, next) {
    var idsp = req.params.id;

    try {
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
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi xóa sản phẩm." });
    }
  }

  async createpage(req, res, next) {
    try {
      var data = await modelCategory.find();
      res.render("create_product", { layout: false, data: data });
    } catch (err) {
      next(err);
    }
  }

  async updatepage(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
      var danhmuc = await modelCategory.find();
      var data = await modelProduct.findById(id); // Sử dụng findById để tìm một tài liệu duy nhất
      if (data) {
        res.render("update_product", {
          layout: false,
          data: data,
          danhmuc: danhmuc,
          idsp: id,
        });
      } else {
        res.status(404).send("Product not found");
      }
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const {
        id_cate,
        name_pro,
        price_pro,
        img_pro,
        sale_pro,
        disc_pro,
        salesVolume_pro,
        status_pro,
      } = req.body;

      if (
        !id_cate ||
        !name_pro ||
        !price_pro ||
        !img_pro ||
        !disc_pro ||
        !status_pro
      ) {
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm." });
      }

      const newProduct = new modelProduct({
        id_cate,
        name_pro,
        price_pro,
        img_pro,
        sale_pro,
        disc_pro,
        salesVolume_pro,
        status_pro,
      });

      const savedProduct = await newProduct.save();

      return res
        .status(201)
        .json({ message: "Thêm sản phẩm thành công.", savedProduct });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi thêm sản phẩm." });
    }
  }

  async update(req, res, next) {
    try {
      await modelProduct.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "Cập nhật thông tin sản phẩm thành công." });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductsController();
