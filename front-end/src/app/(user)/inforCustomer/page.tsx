import React from "react";
import "../../../../public/css/inforCustomer.css";
import "../../../../public/css/login_register.css";

const InforCustomer = () => {
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
                  <h1>Minh Trung</h1>
               </div>

               <div className="main-inforCustomer">
                  <div className="container-main-inforCustomer">
                     <div className="myAccount">
                        <h2>Tài khoản của tôi</h2>

                        <div className="content-inforCustomer">
                           <a href="#!">Chỉnh sửa thông tin</a>
                           <a href="#!">Giỏ hàng (1)</a>
                           <a href="#!">Đăng xuất</a>
                        </div>
                     </div>

                     <div className="information">
                        <h2>Thông tin chi tiết</h2>

                        <div className="content-inforCustomer">
                           <p>Tên tài khoản: Minh Trung</p>
                           <p>Số điện thoại: 0375149202</p>
                           <p>Địa chỉ: 31A, Đ. số 8, Quận 9, Thủ Đức, Hồ Chí Minh</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="history-payment">
                  <div className="title-history-payment">
                     <h2>Lịch sử mua hàng</h2>
                  </div>

                  <div className="container-history-payment">
                     <div className="item-history-payment">
                        <div className="date-history-payment">
                           <p>Ngày đặt: 24/09/2024</p>
                        </div>
                        <div className="content-history-payment">
                           <p className="name-pro-payment">
                              x<span>3</span> Bò sữa phô mai tươi
                           </p>
                           <p className="content-pro-payment">Kích cỡ: Nhỏ</p>
                           <p className="content-pro-payment">Toppings: Kem phô mai macchiato, thạch cà phê</p>
                           <p className="total-pro-payment">Tổng tiền: 195,000đ</p>
                        </div>
                     </div>

                     <div className="item-history-payment">
                        <div className="date-history-payment">
                           <p>Ngày đặt: 24/09/2024</p>
                        </div>
                        <div className="content-history-payment">
                           <p className="name-pro-payment">
                              x<span>3</span> Bò sữa phô mai tươi
                           </p>
                           <p className="content-pro-payment">Kích cỡ: Nhỏ</p>
                           <p className="content-pro-payment">Toppings: Kem phô mai macchiato, thạch cà phê</p>
                           <p className="total-pro-payment">Tổng tiền: 195,000đ</p>
                        </div>
                     </div>

                     {/* <div className="error-empty-history">Không có đơn hàng nào gần đây</div> */}
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default InforCustomer;
