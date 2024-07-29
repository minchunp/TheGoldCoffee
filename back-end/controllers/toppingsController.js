const modelTopping = require("../models/Topping");
const modelCategory = require("../models/Category");

class ToppingsController {
  // topping/listtopping
  async index(req, res, next) {
    try {
      const data = await modelTopping.find();
      const sttArray = [];
      data.forEach((item, index) => {
        sttArray.push(index + 1);
      });
      res.render("listtopping", {
        layout: false,
        data: data,
        sttArray: sttArray,
      });
    } catch (err) {
      next(err);
    }
  }

  // topping/delete/id
  async delete(req, res, next) {
    const id = req.params.id;

    try {
      const deletedTopping = await modelTopping.findByIdAndDelete(id);

      if (!deletedTopping) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy topping để xóa." });
      }

      return res
        .status(200)
        .json({ message: "Xóa topping thành công.", deletedTopping });
    } catch (error) {
      console.error("Lỗi khi xóa topping:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi xóa topping." });
    }
  }

  async createpage(req, res, next) {
    try {
      const data = await modelCategory.find();
      res.render("create_topping", { layout: false, data: data });
    } catch (err) {
      next(err);
    }
  }

  async updatepage(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
      const danhmuc = await modelCategory.find();
      const data = await modelTopping.findById(id); // Sử dụng findById để tìm một tài liệu duy nhất
      if (data) {
        res.render("update_topping", {
          layout: false,
          data: data,
          danhmuc: danhmuc,
          idsp: id,
        });
      } else {
        res.status(404).send("Topping not found");
      }
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const {
        id_cate,
        img_topping,
        name_topping,
        price_topping,
        status_topping,
      } = req.body;

      if (
        !id_cate ||
        !img_topping ||
        !name_topping ||
        !price_topping ||
        !status_topping
      ) {
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin topping." });
      }

      const newTopping = new modelTopping({
        id_cate,
        img_topping,
        name_topping,
        price_topping,
        status_topping,
      });

      const savedTopping = await newTopping.save();

      return res
        .status(201)
        .json({ message: "Thêm topping thành công.", savedTopping });
    } catch (error) {
      console.error("Lỗi khi thêm topping:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi thêm topping." });
    }
  }

  async update(req, res, next) {
    try {
      await modelTopping.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "Cập nhật thông tin topping thành công." });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ToppingsController();
