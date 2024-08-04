import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";

const AddUser = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Thêm tài khoản khách hàng</h1>
                     <Link href="/admin/users">
                        <i className="bi bi-arrow-left-short"></i>
                     </Link>
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
                        <h1>ID Khách hàng #Random</h1>
                     </div>

                     <div id="list-user" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Tên khách hàng</p>
                           <p>Email khách hàng</p>
                           <p>Vai trò</p>
                           <p>Chức năng</p>
                        </div>

                        <form>
                           <div className="main-list">
                              <div className="main-order-pending">
                                 <a href="#">
                                    <p>Random</p>
                                 </a>
                                 <input className="name_user" type="text" name="name_user" placeholder="Tên khách hàng" />
                                 <input className="email_user" type="text" name="email_user" placeholder="Email khách hàng" />
                                 <select name="role_user">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                 </select>
                                 <button type="submit">
                                    <i className="bi bi-check2"></i>
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default AddUser;
