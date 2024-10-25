import React from "react";
import "../../../../public/css/orderDetailAdmin.css";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import Link from "next/link";

const OrderDetailAdmin: React.FC = () => {
   return (
      <>
         <section>
            <div className="main-order-detail">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>
                        Hoá đơn chi tiết <span>#63ec</span>
                     </h1>
                     <Link href="/admin/orders">
                        <i className="bi bi-arrow-left-short"></i>
                     </Link>
                  </div>

                  <div className="order-pending">
                     <div className="title-order-pending">
                        <h1>Danh sách sản phẩm</h1>
                        <div className="infor-user-order">
                           <div className="name-user-order-detail">
                              <h3>Tên khách hàng:</h3>
                              <p>Nguyễn Văn A</p>
                           </div>

                           <div className="address-user-order-detail">
                              <h3>Địa chỉ khách hàng:</h3>
                              <p>TCH, Ho Chi Minh city</p>
                           </div>

                           <div className="address-user-order-detail">
                              <h3>Ngày - Thời gian đặt hàng:</h3>
                              <p>20:00 5/11/2024</p>
                           </div>

                           <div className="address-user-order-detail">
                              <h3>Phương thức thanh toán:</h3>
                              <p>Tiền mặt</p>
                           </div>

                           <form>
                              <div className="status-user-order-detail">
                                 <h3>Trạng thái:</h3>
                                 <div className="status pending">
                                    <select name="status" className="order">
                                       <option selected value="order">
                                          Chờ xác nhận
                                       </option>
                                       <option value="confirm">Đã xác nhận</option>
                                       <option value="shipping">Đang giao hàng</option>
                                       <option value="success">Đã giao thành</option>
                                       <option value="cancel">Huỷ đơn hàng</option>
                                    </select>
                                 </div>
                                 <div className="status confirm">
                                    <select name="status" className="confirm">
                                       <option selected value="confirm">
                                          Đã xác nhận
                                       </option>
                                       <option value="order">Chờ xác nhận</option>
                                       <option value="confirm">Đang giao hàng</option>
                                       <option value="success">Đã giao hàng</option>
                                       <option value="cancel">Huỷ đơn hàng</option>
                                    </select>
                                 </div>
                                 <div className="status in-transit">
                                    <select name="status" className="shipping">
                                       <option selected value="shipping">
                                          Đang giao hàng
                                       </option>
                                       <option value="order">Chờ xác nhận</option>
                                       <option value="confirm">Đã xác nhận</option>
                                       <option value="success">Đã giao hàng</option>
                                       <option value="cancel">Huỷ đơn hàng</option>
                                    </select>
                                 </div>
                                 <div className="status complete">
                                    <select name="status" className="success">
                                       <option selected value="success">
                                          Đã giao hàng
                                       </option>
                                       <option value="shipping">Đang vận chuyển</option>
                                       <option value="order">Chờ xác nhận</option>
                                       <option value="confirm">Đã xác nhận</option>
                                       <option value="cancel">Huỷ đơn hàng</option>
                                    </select>
                                 </div>
                                 <div className="status rejected">
                                    <select name="status" className="cancel">
                                       <option selected value="cancel">
                                          Huỷ đơn hàng
                                       </option>
                                       <option value="shipping">Đang vận chuyển</option>
                                       <option value="success">Đã giao hàng</option>
                                       <option value="order">Chờ xác nhận</option>
                                       <option value="confirm">Đã xác nhận</option>
                                    </select>
                                 </div>

                                 <button type="submit">
                                    <i className="bi bi-check2"></i>
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>

                     <div className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>Tên sản phẩm</p>
                           <p>Giá tiền</p>
                           <p>Kích cỡ</p>
                           <p>Số lượng</p>
                           <p>Tổng tiền</p>
                        </div>

                        <div className="main-list">
                           <div className="main-order-pending">
                              <div className="product-order-detail">
                                 <img src={BannerSectionAdmin.src} alt="" />
                                 <div className="content-product-order-detail">
                                    <p>Tên sản phẩm</p>
                                    <p>Toppings: Trân châu trắng</p>
                                 </div>
                              </div>
                              <p className="pending-total-money">50,000đ</p>
                              <p>L</p>
                              <p>2</p>
                              <p className="order-detail-total-money">100,000đ</p>
                           </div>
                           <div className="main-order-pending">
                              <div className="product-order-detail">
                                 <img src={BannerSectionAdmin.src} alt="" />
                                 <div className="content-product-order-detail">
                                    <p>Tên sản phẩm</p>
                                    <p>Toppings: Không có</p>
                                 </div>
                              </div>
                              <p className="pending-total-money">50,000đ</p>
                              <p>L</p>
                              <p>2</p>
                              <p className="order-detail-total-money">100,000đ</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default OrderDetailAdmin;
