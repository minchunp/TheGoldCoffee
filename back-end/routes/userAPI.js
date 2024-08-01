const express = require("express");
const router = express.Router();
const modelUser = require("../models/User");

// Lấy danh sách tất cả user
// http://localhost:3000/usersAPI/listUser
router.get("/listUser", async (req, res, next) => {
  try {
    const data = await modelUser.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Lấy chi tiết user theo ID
// http://localhost:3000/usersAPI/detailUser/:id
router.get("/detailUser/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await modelUser.findById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Tạo mới user
// http://localhost:3000/usersAPI/create
router.post("/create", async (req, res, next) => {
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
    const newUser = new modelUser({
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
});

// Cập nhật user
// http://localhost:3000/usersAPI/update/:id
router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = await modelUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy user để cập nhật." });
    }
    res.status(200).json({ message: "Cập nhật user thành công.", updatedUser });
  } catch (err) {
    next(err);
  }
});

// Xóa user
// http://localhost:3000/usersAPI/delete/:id
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await modelUser.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Không tìm thấy user để xóa." });
    }
    res.status(200).json({ message: "Xóa user thành công.", deletedUser });
  } catch (err) {
    next(err);
  }
});

// Lấy user theo tên có chứa từ khóa
// http://localhost:3000/usersAPI/detailUserFind_name?name=......
router.get("/detailUserFind_name", async (req, res, next) => {
  try {
    const name = req.query.name;
    const regex = new RegExp(name, "i");
    const data = await modelUser.find({ name_user: { $regex: regex } });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
