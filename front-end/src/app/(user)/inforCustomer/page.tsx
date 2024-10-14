"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jsonwebtoken"; // Thư viện để giải mã token
import "../../../../public/css/inforCustomer.css";
import "../../../../public/css/login_register.css";

const InforCustomer = () => {
  const [userData, setUserData] = useState({
    name_user: "Vui lòng cập nhật thông tin",
    phoneNumber_user: "Vui lòng cập nhật thông tin",
    address_user: "Vui lòng cập nhật thông tin",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (token) {
          const decoded: any = jwt_decode.decode(token); // Giải mã token
          const userId = decoded.id; // Lấy ID từ token

          // Gửi yêu cầu GET lên API để lấy thông tin người dùng
          const response = await axios.get(
            `http://localhost:3001/usersAPI/detailUser/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
              },
            }
          );

          const user = response.data; // Lưu thông tin người dùng
          console.log("Thông tin người dùng: ", user);

          // Cập nhật state với thông tin người dùng hoặc giá trị mặc định nếu rỗng
          setUserData({
            name_user: user.name_user || "Vui lòng cập nhật thông tin",
            phoneNumber_user:
              user.phoneNumber_user || "Vui lòng cập nhật thông tin",
            address_user: user.address_user || "Vui lòng cập nhật thông tin",
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng: ", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchUserData(); // Gọi hàm lấy thông tin người dùng
  }, []);

  if (loading) {
    return <h2>Đang tải dữ liệu...</h2>; // Hiển thị khi dữ liệu đang được tải
  }

  return (
    <>
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / Thông tin khách hàng</p>
        </div>
      </section>

      {/* Main body information customer */}
      <main className="body-inforCustomer">
        <div className="boxcenter">
          <div className="title-inforCustomer">
            <h1>{userData.name_user}</h1>
          </div>

          <div className="main-inforCustomer">
            <div className="container-main-inforCustomer">
              <div className="myAccount">
                <h2>Tài khoản của tôi</h2>

                <div className="content-inforCustomer">
                  <a href="#!">Chỉnh sửa thông tin</a>
                  <a href="#!">Giỏ hàng (1)</a>
                  <a
                    href="#!"
                    onClick={() => {
                      localStorage.removeItem("token"); // Xóa token khi đăng xuất
                      window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
                    }}
                  >
                    Đăng xuất
                  </a>
                </div>
              </div>

              <div className="information">
                <h2>Thông tin chi tiết</h2>

                <div className="content-inforCustomer">
                  <p>Tên tài khoản: {userData.name_user}</p>
                  <p>Số điện thoại: {userData.phoneNumber_user}</p>
                  <p>Địa chỉ: {userData.address_user}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default InforCustomer;
