import "../../../../public/css/payment.css";
import "../../../../public/css/login_register.css";
import React from "react";

const Payment = () => {
   return (
      <>
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Thanh toán</p>
            </div>
         </section>

         <main className="body-payment">
            <div className="boxcenter-payment">
               <div className="container-payment">
                  <div className="info-payment">
                     <div className="confirm-info">
                        <h2>Xác nhận thanh toán</h2>
                        <div className="input-payment">
                           <p>Địa chỉ cửa hàng</p>
                           <select name="" id="">
                              <option value="">QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</option>
                              <option value="">57, Đ. Phan Huy Ích, Quận Gò Vấp, Hồ Chí Minh</option>
                              <option value="">123, Đ. Phan Văn Trị, Quận Gò Vấp, Hồ Chí Minh</option>
                           </select>
                        </div>

                        <div className="input-payment">
                           <p>Tên người nhận</p>
                           <input type="text" placeholder="Tên người nhận" />
                        </div>

                        <div className="input-payment">
                           <p>Số điện thoại</p>
                           <input type="text" placeholder="Số điện thoại" />
                        </div>

                        <div className="input-payment">
                           <p>Đại chỉ</p>
                           <input type="text" placeholder="Địa chỉ" />
                        </div>

                        <div className="input-payment">
                           <p>Ghi chú</p>
                           <input type="text" placeholder="Ghi chú" />
                        </div>
                     </div>

                     <div className="method-payment">
                        <h2>Phương thức thanh toán</h2>
                     </div>

                     <button className="main-btn main-btn__payment">Đặt hàng</button>
                  </div>

                  <div className="products-payment">
                     <div className="main-products-payment">
                        <div className="title-products-payment">
                           <h2>Các món đã chọn</h2>
                        </div>

                        <div className="container-products-payment">
                           <div className="product-payment">
                              <div className="infor-product-payment">
                                 <p className="name-pro-payment">
                                    x<span>3</span> Bò sữa phô mai tươi
                                 </p>
                                 <p className="content-pro-payment">Kích cỡ: Nhỏ</p>
                                 <p className="content-pro-payment">Toppings: Kem phô mai macchiato, thạch cà phê</p>
                              </div>
                              <p className="total-price-pro-payment">195,000đ</p>
                           </div>
                        </div>

                        <div className="main-total-products-payment">
                           <h2>Tổng cộng</h2>
                           <div className="container-total-products-payment">
                              <div className="result-subtotal result-subtotal__0">
                                 <p className="title-subtotal">Tạm tính</p>
                                 <p className="price-subtotal">195,000đ</p>
                              </div>
                              <div className="result-subtotal result-subtotal__0">
                                 <p className="title-subtotal">Mã khuyến mãi</p>
                                 <p className="price-subtotal">-20,000đ</p>
                              </div>
                              <div className="result-subtotal result-subtotal__0">
                                 <p className="title-subtotal">Phí vận chuyển</p>
                                 <p className="price-subtotal">15,000đ</p>
                              </div>
                              <div className="result-subtotal result-subtotal__1">
                                 <p className="title-subtotal">Tổng thanh toán</p>
                                 <p className="price-subtotal">190,000đ</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default Payment;
