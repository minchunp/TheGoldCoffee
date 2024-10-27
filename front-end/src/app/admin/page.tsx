import "../../../public/css/dashboardAdmin.css";

const Dashboard = () => {
   return (
      <>
         {/* <!-- Section dashboard --> */}
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Dashboard</h1>
                     {/* <!-- <i id="add-product-page-btn" className="bi bi-plus"></i> --> */}
                  </div>

                  <div className="container-box-infor-dashboard">
                     <div className="infor-dashboard">
                        <div className="top-infor-dashboard">
                           <div className="title-infor-dasboard">
                              <p>Tổng khách hàng</p>
                              <h3>500</h3>
                           </div>

                           <div className="icon-infor-dashboard_1">
                              <i className="bi bi-people-fill"></i>
                           </div>
                        </div>
                        <div className="content-infor-dashboard">
                           <i className="bi bi-graph-up-arrow up"></i>
                           <p>
                              <span className="up">Tăng 8.3%</span> so với tuần trước
                           </p>
                        </div>
                     </div>

                     <div className="infor-dashboard">
                        <div className="top-infor-dashboard">
                           <div className="title-infor-dasboard">
                              <p>Tổng hoá đơn</p>
                              <h3>1400</h3>
                           </div>

                           <div className="icon-infor-dashboard_2">
                              <i className="bi bi-box"></i>
                           </div>
                        </div>
                        <div className="content-infor-dashboard">
                           <i className="bi bi-graph-up-arrow up"></i>
                           <p>
                              <span className="up">Tăng 1.3%</span> so với tuần trước
                           </p>
                        </div>
                     </div>

                     <div className="infor-dashboard">
                        <div className="top-infor-dashboard">
                           <div className="title-infor-dasboard">
                              <p>Tổng tiền bán được</p>
                              <h3>$35,00</h3>
                           </div>

                           <div className="icon-infor-dashboard_3">
                              <i className="bi bi-graph-up"></i>
                           </div>
                        </div>
                        <div className="content-infor-dashboard">
                           <i className="bi bi-graph-down-arrow down"></i>
                           <p>
                              <span className="down">Giảm 4.5%</span> so với tuần trước
                           </p>
                        </div>
                     </div>

                     <div className="infor-dashboard">
                        <div className="top-infor-dashboard">
                           <div className="title-infor-dasboard">
                              <p>Tổng đơn hàng đợi</p>
                              <h3>3</h3>
                           </div>

                           <div className="icon-infor-dashboard_4">
                              <i className="bi bi-clock-history"></i>
                           </div>
                        </div>
                        <div className="content-infor-dashboard">
                           <i className="bi bi-graph-up-arrow up"></i>
                           <p>
                              <span className="up">Tăng 1.3%</span> so với tuần trước
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="order-pending">
                     <div className="title-order-pending">
                        <h1>Đơn hàng đang đợi</h1>
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
                           <p>Id</p>
                           <p>Tên khách hàng</p>
                           <p>Địa chỉ</p>
                           <p>Tổng tiền</p>
                           <p>Ngày - Thời gian</p>
                           <p>Trạng thái</p>
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
                                 <div className="status pending">
                                    <p>Chờ xác nhận</p>
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

export default Dashboard;
