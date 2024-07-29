var modelCategory = require("../models/Category");

class CategorysController {
  async index(req, res, next) {
    try {
      var data = await modelCategory.find();
      const sttArray = [];
      data.forEach((item, index) => {
        sttArray.push(index + 1);
      });
      res.render("listcategory", {
        layout: false,
        data: data,
        sttArray: sttArray,
      });
    } catch (err) {
      next(err);
    }
  }

  // Tạo danh mục mới
  async create(req, res, next) {
    try {
      const { img_cate, name_cate, status_cate } = req.body;

      if (!img_cate || !name_cate || !status_cate) {
        return res.status(400).json(req.body);
      }

      const newCategory = new modelCategory({
        img_cate,
        name_cate,
        status_cate,
      });

      console.log(newCategory);

      const savedCategory = await newCategory.save();

      return res
        .status(201)
        .json({ message: "Thêm danh mục thành công.", savedCategory });
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi thêm danh mục." });
    }
  }

  async updatepage(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
      var danhmuc = await modelCategory.find();
      var data = await modelCategory.findById(id); // Sử dụng findById để tìm một tài liệu duy nhất
      if (data) {
        res.render("update_category", {
          layout: false,
          name_cate: data.name_cate,
          img_cate: data.img_cate,
          status_cate: data.status_cate,
          id: id,
        });
      } else {
        res.status(404).send("Category not found");
      }
    } catch (err) {
      next(err);
    }
  }

  // Xóa danh mục
  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const deletedCategory = await modelCategory.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy danh mục để xóa." });
      }
      return res
        .status(200)
        .json({ message: "Xóa danh mục thành công.", deletedCategory });
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi xóa danh mục." });
    }
  }

  async update(req, res, next) {
    try {
      await modelCategory.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "Cập nhật thông tin danh mục thành công." });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategorysController();
