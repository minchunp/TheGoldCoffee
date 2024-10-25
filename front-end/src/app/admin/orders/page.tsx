import React from "react";
import "../../../../public/css/orderAdmin.css";
import "../../../../public/css/dashboardAdmin.css"
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";

const OrderAdmin: React.FC = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Order</h1>
                  </div>

                  <div className="banner-product">
                     <img src={BannerSectionAdmin.src} alt="" />
                     <div className="text-banner">
                        <p>CHÀO MỪNG BẠN ĐẾN VỚI</p>
                        <h1>THE GOLD COFFEE</h1>
                        <p>NĂM 2024</p>
                     </div>
                  </div>

                  <div className="order-pending">
                     <div className="title-order-pending">
                        <h1>Danh sách đơn hàng</h1>
                        <div className="filter-oder-pending">
                           <select name="" id="">
                              <option value="">January</option>
                              <option value="">February</option>
                              <option value="">March</option>
                              <option value="">April</option>
                              <option value="">May</option>
                              <option value="">June</option>
                              <option value="">July</option>
                              <option value="">August</option>
                              <option value="">September</option>
                              <option value="">October</option>
                              <option value="">November</option>
                              <option value="">December</option>
                           </select>
                        </div>
                     </div>

                     <div className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Tên khách hàng</p>
                           <p>Địa chỉ</p>
                           <p>Tổng tiền</p>
                           <p>Ngày - Thời gian</p>
                           <p>Trạngt thái</p>
                        </div>

                        <div className="main-list">
                           {/* <div className="alert-empty-admin">Không có đơn hàng</div> */}
                           <div className="main-order-pending">
                              <a href="/admin/order/<%= order._id %>">
                                 <p>er53</p>
                              </a>
                              <p>Nguyễn Văn A</p>
                              <p>TCH, Ho Chi Minh city</p>
                              <p className="pending-total-money">100,000đ</p>
                              <p>20:00 5/10/2024</p>
                              <a className="statusA" href="">
                                 <div className="status pending">
                                    <p>Chờ xác nhận</p>
                                 </div>
                              </a>
                           </div>
                           <div className="main-order-pending">
                              <a href="/admin/order/<%= order._id %>">
                                 <p>er53</p>
                              </a>
                              <p>Nguyễn Văn A</p>
                              <p>TCH, Ho Chi Minh city</p>
                              <p className="pending-total-money">100,000đ</p>
                              <p>20:00 5/10/2024</p>
                              <a className="statusA" href="">
                                 <div className="status confirm">
                                    <p>Đã xác nhận</p>
                                 </div>
                              </a>
                           </div>
                           <div className="main-order-pending">
                              <a href="/admin/order/<%= order._id %>">
                                 <p>er53</p>
                              </a>
                              <p>Nguyễn Văn A</p>
                              <p>TCH, Ho Chi Minh city</p>
                              <p className="pending-total-money">100,000đ</p>
                              <p>20:00 5/10/2024</p>
                              <a className="statusA" href="">
                                 <div className="status in-transit">
                                    <p>Đang giao hàng</p>
                                 </div>
                              </a>
                           </div>
                           <div className="main-order-pending">
                              <a href="/admin/order/<%= order._id %>">
                                 <p>er53</p>
                              </a>
                              <p>Nguyễn Văn A</p>
                              <p>TCH, Ho Chi Minh city</p>
                              <p className="pending-total-money">100,000đ</p>
                              <p>20:00 5/10/2024</p>
                              <a className="statusA" href="">
                                 <div className="status complete">
                                    <p>Đã giao hàng</p>
                                 </div>
                              </a>
                           </div>
                           <div className="main-order-pending">
                              <a href="/admin/order/<%= order._id %>">
                                 <p>er53</p>
                              </a>
                              <p>Nguyễn Văn A</p>
                              <p>TCH, Ho Chi Minh city</p>
                              <p className="pending-total-money">100,000đ</p>
                              <p>20:00 5/10/2024</p>
                              <a className="statusA" href="">
                                 <div className="status rejected">
                                    <p>Huỷ đơn hàng</p>
                                 </div>
                              </a>
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

export default OrderAdmin;
