const express = require("express");
const router = express.Router();
const modelComment = require("../models/Comment");

// http://localhost:3001/CommentsAPI/add
router.post("/add", async (req, res, next) => {
  try {
    // Lấy dữ liệu từ body của request
    const { id_pro, id_user, name_user, email, content_comment, date_comment } =
      req.body;

    // Tạo đối tượng bình luận mới
    const newComment = new modelComment({
      id_pro,
      id_user,
      name_user,
      email,
      content_comment,
      date_comment,
    });

    // Lưu vào cơ sở dữ liệu
    const savedComment = await newComment.save();

    // Phản hồi lại client với dữ liệu bình luận đã lưu
    res.status(201).json({
      message: "Comment added successfully!",
      comment: savedComment,
    });
  } catch (err) {
    // Xử lý lỗi và chuyển tiếp tới middleware lỗi
    next(err);
  }
});

// http://localhost:3001/CommentsAPI/getByProduct/:id_pro
router.get("/getByProduct/:id_pro", async (req, res, next) => {
  try {
    // Lấy id_pro từ params
    const id_pro = req.params.id_pro;

    // Tìm các bình luận có cùng id_pro
    const comments = await modelComment.find({ id_pro });

    // Nếu không có bình luận nào
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this product." });
    }

    // Định dạng ngày-tháng-năm giờ:phút
    const formattedComments = comments.map((comment) => ({
      ...comment._doc, // Sao chép toàn bộ dữ liệu từ comment
      date_comment: new Date(comment.date_comment).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // Phản hồi danh sách bình luận đã định dạng
    res.status(200).json(formattedComments);
  } catch (err) {
    // Xử lý lỗi và chuyển tiếp tới middleware lỗi
    next(err);
  }
});

module.exports = router;
