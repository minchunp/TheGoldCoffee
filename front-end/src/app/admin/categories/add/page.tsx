import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";

const AddCate = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Thêm danh mục</h1>
                     <Link href="/admin/categories">
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
                        <h1>ID danh mục #Random</h1>
                     </div>

                     <div id="list-cate" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Ảnh danh mục</p>
                           <p>Tên danh mục</p>
                           <p>Chức năng</p>
                        </div>

                        <form>
                           <div className="main-list">
                              <div className="main-order-pending">
                                 <a href="#">
                                    <p>Random</p>
                                 </a>
                                 <input type="file" name="name_user" placeholder="Ảnh danh mục" />
                                 <input type="text" name="email_user" placeholder="Tên danh mục" />
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
   )
}

export default AddCate;