"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken"; // Import thư viện jsonwebtoken để giải mã token
import "../../../../public/css/login_register.css";

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
  const [emailError, setEmailError] = useState(""); // lỗi cho email
  const [passwordError, setPasswordError] = useState(""); // lỗi cho password

const validateForm = (): boolean =>{
  let isValid = true;

  //kiểm tra email
  if(!/\S+@\S+\.\S+/.test(email_user)){
    setEmailError("Email không đúng định dạng!");
    isValid = false;
  }else{
    setEmailError("");
  }

  // kiểm tra mật khẩu
  if(!/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/.test(pass_user)){
    setPasswordError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm 1 chữ hoa!");
    isValid = false;
  }else{
    setPasswordError("");
  }
  return isValid;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // kiểm tra form trước khi gửi
    if(!validateForm()) return;

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

        if (token) {
          try {
            var decoded: any = jwt.decode(token); // Giải mã token để lấy thông tin người dùng
          } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
          }
        }

        if (decoded) {
          if (decoded.role_user === "admin") {
            window.location.href = "/";
          } else {
            console.log("Đăng nhập thành công!", decoded);
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
                {emailError && <h3 className="error">{emailError}</h3>}
                {passwordError && <h3 className="error">{passwordError}</h3>}
                <a href="/forgotAccount" className="forgot-password">
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
