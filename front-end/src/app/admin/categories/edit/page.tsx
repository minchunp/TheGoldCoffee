import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";

const EditCate = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Sửa danh mục</h1>
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

                     <div id="list-user" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Ảnh danh mục</p>
                           <p>Tên danh mục</p>
                           <p>Trạng thái</p>
                           <p>Chức năng</p>
                        </div>

                        <form>
                           <div className="main-list">
                              <div className="main-order-pending">
                                 <a href="#">
                                    <p>Random</p>
                                 </a>
                                 <div className="container-img-cate-edit">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}1669736859_hi-tea-yuzu-tran-chau_400x400.png`} alt="" />
                                    <input type="file" placeholder="Ảnh danh mục" />
                                 </div>
                                 <input type="text" placeholder="Tên danh mục" />
                                 <input type="checkbox" placeholder="Tên danh mục" />
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

export default EditCate;