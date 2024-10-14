const mongoose = require("mongoose");
const User = require("../models/User");

class UsersController {
  // Lấy danh sách tất cả user
  async index(req, res, next) {
    try {
      const data = await User.find();
      res.render("listuser", { layout: false, data: data });
    } catch (err) {
      next(err);
    }
  }

  // Trang tạo mới user
  createpage(req, res) {
    res.render("add_user", { layout: false });
  }

  // Tạo mới user
  async create(req, res, next) {
    try {
      const {
        name_user,
        email_user,
        phoneNumber_user,
        pass_user,
        address_user,
        role_user,
        status_user,
      } = req.body;

      const newUser = new User({
        name_user,
        email_user,
        phoneNumber_user,
        pass_user,
        address_user,
        role_user,
        status_user,
      });

      const savedUser = await newUser.save();
      res.status(201).json({ message: "Tạo user thành công.", savedUser });
    } catch (err) {
      next(err);
    }
  }

  // Trang cập nhật user theo ID
  async updatepage(req, res, next) {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (user) {
        res.render("update_user", {
          layout: false,
          user: user,
        });
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      next(err);
    }
  }

  // Cập nhật user theo ID
  async update(req, res, next) {
    const id = req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy user để cập nhật." });
      }
      res
        .status(200)
        .json({ message: "Cập nhật user thành công.", updatedUser });
    } catch (err) {
      next(err);
    }
  }

  // Xóa user theo ID
  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Không tìm thấy user để xóa." });
      }
      res.status(200).json({ message: "Xóa user thành công.", deletedUser });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
