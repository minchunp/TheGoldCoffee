import Link from "next/link";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";

const UserAdmin = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Users</h1>
                     <Link href="/admin/users/add">
                        <i className="bi bi-plus"></i>
                     </Link>
                  </div>

                  <div className="banner-product">
                     <img src={BannerSectionAdmin.src} alt="" />
                     <div className="text-banner">
                        <p>WELCOME TO OUR</p>
                        <h1>FURNITURE</h1>
                        <p>GALLERY 2024</p>
                     </div>
                  </div>

                  <div className="order-pending">
                     <div className="title-order-pending">
                        <h1>Edit User</h1>
                     </div>

                     <div id="list-user" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>User Name</p>
                           <p>Email User</p>
                           <p>Role</p>
                           <p>Function</p>
                        </div>

                        <div className="main-list">
                           <div className="main-order-pending">
                              <Link href="#!">
                                 <p>ID</p>
                              </Link>
                              <p>Tên khách hàng</p>
                              <p>Email khách hàng</p>
                              <p>Vai trò</p>
                              <div className="container-func">
                                 <button><i className="bi bi-gear"></i></button>
                                 <button><i className="bi bi-x-lg"></i></button>
                              </div>
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

export default UserAdmin;
