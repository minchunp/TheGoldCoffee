"use client"
import React, { useState} from "react"
import axios from "axios";
import "../../../../public/css/login_register.css";

const Register: React.FC = () => {
   const [name_user, setNameUser] = useState('');
   const [email_user, setEmailUser] = useState('');
   const [phoneNumber_user, setPhoneNumberUser] = useState('');
   const [pass_user, setPassUser] = useState('');
   const [address_user, setAddressUser] = useState('');
   const [role_user, setRoleUser] = useState('user');
   const [status_user, setStatusUser] = useState(1);
   const [confirmPass_user, setConfirmPass_user] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (pass_user != confirmPass_user) {
         setError('Mật khẩu của bạn nhập lại không chính xác!');
         return;
      }
      if (name_user && pass_user) {
         try {
            const respone = await axios.post("http://localhost:3000/users", {
               name_user,
               email_user,
               phoneNumber_user,
               pass_user,
               address_user,
               role_user,
               status_user
            });
            const dataUser = await respone.data;
            console.log('Đăng ký thành công!', dataUser);
            window.location.href = "/login";
         } catch (e) {
            console.log('Đăng ký thất bại!', e);
            setError('Đăng nhập thất bại!');
         }
      } else {
         setError('Tên đăng nhập hoặc mật khẩu chưa được nhập!');
      }
   }

   return (
      <>
         {/* <Navbar /> */}

         {/* Section Login */}
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Đăng ký</p>
            </div>
         </section>

         <main className="account-login-register">
            <div className="boxcenter-account">
               <div className="container-account">
                  {/* Form user login or user register  */}
                  <div className="form-user-submit">
                     <h1>Đăng ký</h1>
                     <p>Vui lòng đăng ký chi tiết tài khoản bên dưới</p>
                     <form onSubmit={handleSubmit} className="main-form">
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
                        </div>
                        <div className="section-input">
                           <p>Số điện thoại</p>
                           <input 
                              type="text" 
                              value={phoneNumber_user} 
                              placeholder="Số điện thoại" 
                              onChange={(e) => setPhoneNumberUser(e.target.value)}
                              required
                           />
                        </div>
                        <div className="section-input">
                           <p>Địa chỉ</p>
                           <input 
                              type="text" 
                              value={address_user} 
                              placeholder="Địa chỉ" 
                              onChange={(e) => setAddressUser(e.target.value)}
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

                  {/* Option login or register */}
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
                           Sự riêng tư và bảo mật của bạn quan trọng với chúng tôi. Mọi thông tin thêm xin hãy truy cập vào <b>privacy policy</b>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </main>

         {/* <Footer /> */}
      </>
   );
};

export default Register;
