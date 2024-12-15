"use client";
import React, { useState } from "react";
import axios from "axios";
import "../../../../public/css/login_register.css";


const Register: React.FC = () => {
  const [name_user, setNameUser] = useState("");
  const [email_user, setEmailUser] = useState("");
  const [pass_user, setPassUser] = useState("");
  const [confirmPass_user, setConfirmPass_user] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // Lưu mã xác nhận người dùng nhập
  const [generatedCode, setGeneratedCode] = useState(); // Lưu mã được gửi từ backend
  const [emailError, setEmailError] = useState(""); // Lỗi của email
  const [passwordError, setPasswordError] = useState(""); // Lỗi của mật khẩu
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Quản lý bước đăng ký: 1-> Form, 2-> xác minh
  const [timer, setTimer] = useState(0);
  const [waitResend, setwaitResend] = useState(false);

  // Hàm kiểm tra dữ liệu form
  const validateForm = (): boolean => {
    let isValid = true;

    // Kiểm tra email
    if (!/\S+@\S+\.\S+/.test(email_user)) {
      setEmailError("Email không đúng định dạng!");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Kiểm tra mật khẩu
    if (!/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/.test(pass_user)) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm 1 chữ viết hoa!");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  // Hàm gửi mã xác minh
  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kiểm tra dữ liệu form trước khi gửi
    if (!validateForm()) return;
  
    if (pass_user !== confirmPass_user) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }
  
    try {
      // Gửi yêu cầu gửi mã xác minh
      const payload  = {
        email_user,
        action:"register"
      }

      const response = await axios.post("http://localhost:3001/auth/sendVerificationCode",payload);
      // console.log(response);
      
      if (response.status === 200) {
        // console.log("Mã xác thực đã được gửi!", response.data);
        const code = response.data.code;
        // console.log(code);
        setGeneratedCode(code); // Lưu mã xác thực
        setStep(2); // Chuyển sang bước nhập mã xác thực
      } else {
        setError("Không thể gửi mã xác thực, vui lòng thử lại!");
      }
    } catch (e: any) {
      // console.error("Gửi mã xác thực thất bại!", e);
      setError(e.response?.data?.message || "Lỗi xảy ra khi gửi mã xác thực!");
    }
  };

  // Hàm xử lý xác minh và đăng ký
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("mã nhập vào",verificationCode);
    console.log("so sánh với ",generatedCode); // undefind
    try {
      // Gửi yêu cầu đăng ký tài khoản khi mã xác thực đúng
      const registerResponse = await axios.post("http://localhost:3001/auth/register", {
        name_user,
        email_user,
        pass_user,
        code:verificationCode
      });

      if (registerResponse.status === 200) {
        alert("Đăng ký thành công!");
        window.location.href = "/login";
      }
    } catch (e: any) {
      console.error("Đăng ký thất bại!", e);
      setError(e.response?.data?.msg || "Đăng ký thất bại!");
    }
  };

  const startTimer = () =>{
    setTimer(60);
    setwaitResend(true);
    const countdown = setInterval(()=>{
      setTimer((wait) => {
        if( wait < 1){
          clearInterval(countdown);
          setwaitResend(false);
          return 0;
        }
        return wait -1;
      });
    },1000);
  }

  const handlewaitResend = async () =>{
    if(waitResend) return;
    try{
      const payload = { email_user };
      const response = await axios.post("http://localhost:3001/auth/sendVerificationCode",payload);

      if(response.status === 200){
        const code = response.data.code;
        setGeneratedCode(code);
        startTimer();
        setError("");
      } else {
        setError("Không thể gửi mã xác thực, vui lòng thử lại!");
      }
    } catch (e:any) {
      setError(e.response?.data?.message || "Lỗi xảy ra khi gửi mã xác thực!");
    }
  };

  return (
    <>
      {/* Section Title */}
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / Đăng ký</p>
        </div>
      </section>

      <main className="account-login-register">
        <div className="boxcenter-account">
          <div className="container-account">
            {step === 1 ? (
              <div className="form-user-submit">
                <h1>Đăng ký</h1>
                <p>Vui lòng đăng ký chi tiết tài khoản bên dưới</p>
                <form onSubmit={handleVerification} className="main-form">
                  <div className="section-input">
                    <p>Tên tài khoản</p>
                    <input
                      type="text"
                      value={name_user}
                      placeholder="Tên tài khoản"
                      onChange={(e) => setNameUser(e.target.value)}
                      required
                    />
                  </div>
                  <div className="section-input">
                    <p>Email</p>
                    <input
                      type="text"
                      value={email_user}
                      placeholder="Email"
                      onChange={(e) => setEmailUser(e.target.value)}
                      required
                    />
                    {emailError && <h3 className="error">{emailError}</h3>}
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
                    {passwordError && <h3 className="error">{passwordError}</h3>}
                  </div>
                  <div className="section-input">
                    <p>Nhập lại mật khẩu</p>
                    <input
                      type="password"
                      value={confirmPass_user}
                      placeholder="Nhập lại mật khẩu"
                      onChange={(e) => setConfirmPass_user(e.target.value)}
                      required
                    />
                  </div>
                  <button className="main-button-form-user" type="submit">
                    Đăng ký
                  </button>
                  {error && <h3 className="error">{error}</h3>}
                </form>
              </div>
            ) : (
              <div className="form-user-submit">
                <h1>Xác minh email</h1>
                <p>Một mã xác minh đã được gửi đến email của bạn.</p>
                <form onSubmit={handleSubmit} className="main-form">
                  <div className="section-input">
                    <p>Nhập mã xác minh</p>
                    <input
                      type="text"
                      value={verificationCode}
                      placeholder="Mã xác minh"
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  <button className="main-button-form-user" type="submit">
                    Xác minh
                  </button>
                  {/* <button className="" type="button"
                  onClick={handlewaitResend} disabled={waitResend}> Gửi lại mã {timer > 0 && `(${timer}s)`}</button> */}
                  <span className={`resend-code ${waitResend ? 'disable' : ''}`}
                  onClick={handlewaitResend}
                  style={{cursor: waitResend ? 'not-allowed' : 'pointer', color:waitResend ? 'gray' : ' rgb(61, 105, 234)'}}>
                    Gửi lại mã {timer > 0 && `(${timer}s)`}
                  </span>
                  {error && <h3 className="error">{error}</h3>}
                </form>
              </div>
            )}

            <div className="option-user-choose">
              <h2>Bạn đã có tài khoản?</h2>
              <a className="button-option" href="/login">
                <button>Đăng nhập</button>
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

export default Register;
