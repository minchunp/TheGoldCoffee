"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

// Định nghĩa kiểu dữ liệu User
interface User {
  email_user: string;
  pass_user: string;
  role_user: string;
  token: string; // Giả sử token có trong đối tượng User
}

const Login = () => {
  const [email_user, setEmailUser] = useState("");
  const [pass_user, setPassUser] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email_user && pass_user) {
      try {
        const response: AxiosResponse<{ token: string; users: User[] }> =
          await axios.post("http://localhost:3001/auth/login", {
            email_user,
            pass_user,
          });

        console.log("Phản hồi: ", response.data);
        const token = response.data.token; // Lấy token từ phản hồi
        localStorage.setItem("token", token); // Lưu token vào localStorage

        const dataUser = response.data.users.find(
          (user: User) =>
            user.email_user === email_user && user.pass_user === pass_user
        );

        if (dataUser) {
          if (dataUser.role_user === "admin") {
            window.location.href = "/admin";
          } else {
            console.log("Đăng nhập thành công!", dataUser);
            window.location.href = "/";
          }
        } else {
          console.log("Đăng nhập thất bại");
          setError("Email hoặc mật khẩu không chính xác!");
        }
      } catch (e) {
        console.log("Đăng nhập không thành công!", e);
        setError("Có lỗi xảy ra!");
      }
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không được nhập!");
    }
  };

  return (
    <>
      {/* Section Login */}
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / Đăng nhập</p>
        </div>
      </section>

      <main className="account-login-register">
        <div className="boxcenter-account">
          <div className="container-account">
            {/* Form user login */}
            <div className="form-user-submit">
              <h1>Đăng nhập</h1>
              <p>Vui lòng nhập chi tiết tài khoản bên dưới</p>
              <form onSubmit={handleSubmit} className="main-form">
                <div className="section-input">
                  <p>Email</p>
                  <input
                    type="text"
                    value={email_user}
                    placeholder="Email"
                    onChange={(e) => setEmailUser(e.target.value)}
                    required
                  />
                </div>
                <div className="section-input">
                  <p>Mật khẩu</p>
                  <input
                    type="password"
                    value={pass_user}
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassUser(e.target.value)}
                    required
                  />
                </div>
                <button className="main-button-form-user" type="submit">
                  Đăng nhập
                </button>
                {error && <h3 className="error">{error}</h3>}
                <a href="#!" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </form>
            </div>

            {/* Option login or register */}
            <div className="option-user-choose">
              <h2>Bạn chưa có tài khoản?</h2>
              <a className="button-option" href="/register">
                <button>Tạo tài khoản</button>
              </a>
              <div className="content-option-user-choose">
                <p className="title-content-option">
                  *<b>Điều khoản và điều kiện.</b>
                </p>
                <p className="info-content-option">
                  Sự riêng tư và bảo mật của bạn quan trọng với chúng tôi. Mọi
                  thông tin thêm xin hãy truy cập vào <b>privacy policy</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
