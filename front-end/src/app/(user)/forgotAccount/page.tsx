"use client";
import React, { useState } from "react";
import axios from "axios";
import "../../../../public/css/login_register.css";
import { log } from "console";


const Forgotpass: React.FC = () => {
const [email_user, setEmailUser] = useState("");
const [verificationCode, setVerificationCode] = useState(""); // Lưu mã xác nhận người dùng nhập
const [generatedCode, setGeneratedCode] = useState(); // Lưu mã được gửi từ backend
const [newPassword, setnewPassword] = useState("");
const [emailError, setEmailError] = useState(""); // Lỗi của email
const [error, setError] = useState("");
const [step, setStep] = useState(1); // Quản lý bước đăng ký: 1-> Form, 2-> xác minh, 3-> cập nhật lại mất khẩu
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
return isValid;
};

// Hàm gửi mã xác minh
const handleForgotpass = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
if (!validateForm()) return;
try {
    // Gửi yêu cầu gửi mã xác minh
    const payload  = {
    email_user,
    action: "forgot",
    
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

const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(verificationCode);
    console.log(generatedCode);
    
    
    try{
        const payload = {
            email_user,
            action:"?",
            code: verificationCode
        };
        const Otp = await axios.post("http://localhost:3001/auth/sendVerificationCode",payload);
        if(Otp.status === 200){
            setStep(3);
        } else {
            setError("Mã xác thực không chính xác!!!");
        }
    } catch (e:any){
        setError(e.response?.data?.msg || "Lỗi xác minh!");
    }
};

const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
        const payload = {email_user, newPassword};
        const response = await axios.post("http://localhost:3001/auth/sendVeriCodepass",payload);
        if(response.status === 200){
            alert("Cập nhật mật khẩu thành công");
            window.location.href = "/login";
        } else {
            setError("Không thể cập nhật mật khẩu, vui lòng thử lại!");
        }
    } catch (e: any) {
        setError(e.response?.data?.message || "Có lỗi khi cập nhật mật khẩu")
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
    const payload = {
        email_user, 
        action: "forgot"
    }

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
        <p>Trang chủ / Quên mật khẩu</p>
    </div>
    </section>

    <main className="account-login-register">
    <div className="boxcenter-account">
        <div className="container-account">
        {step === 1 && (
            <div className="form-user-submit">
            <h1>Bạn quên mật khẩu</h1>
            <p>Vui lòng nhập email đã đăng ký</p>
            <form onSubmit={handleForgotpass} className="main-form">
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
                <button className="main-button-form-user" type="submit">
                Gửi mã OTP
                </button>
                {error && <h3 className="error">{error}</h3>}
            </form>
            </div>
        )} 
        {step === 2 && (
            <div className="form-user-submit">
            <h1>Xác minh email</h1>
            <p>Một mã xác minh đã được gửi đến email của bạn.</p>
            <form onSubmit={handleVerifyCode} className="main-form">
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
                <span className={`resend-code ${waitResend ? 'disable' : ''}`}
                    onClick={handlewaitResend}
                    style={{cursor: waitResend ? 'not-allowed' : 'pointer', color:waitResend ? 'gray' : ' rgb(61, 105, 234)'}}>
                    Gửi lại mã {timer > 0 && `(${timer}s)`}
                </span>
                {error && <h3 className="error">{error}</h3>}
            </form>
            </div>
        )}
        {step === 3 &&(       
            <div className="form-user-submit">
                <h1>Cập nhật mật khẩu</h1>
                <form onSubmit={handleResetPassword} className="main-form">
                    <div className="section-input">
                        <p>Mật khẩu mới</p>
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="Mật khẩu mới"
                            onChange={(e) => setnewPassword(e.target.value)}
                            required/>
                    </div>
                    <button className="main-button-form-user" type="submit">Cập nhật mật khẩu</button>
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

export default Forgotpass;
