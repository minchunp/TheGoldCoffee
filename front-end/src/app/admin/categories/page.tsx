import Link from "next/link";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";

const CategoryAdmin = () => {
   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Danh mục sản phẩm</h1>
                     <Link href="/admin/categories/add">
                        <i className="bi bi-plus"></i>
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
                        <h1>Danh sách danh mục</h1>
                     </div>

                     <div id="list-cate" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Ảnh danh mục</p>
                           <p>Tên danh mục</p>
                           <p>Function</p>
                        </div>

                        <div className="main-list">
                           <div className="main-order-pending">
                              <Link href="#!">
                                 <p>ID</p>
                              </Link>
                              <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}1669736859_hi-tea-yuzu-tran-chau_400x400.png`} alt="" />
                              <p>Tên danh mục</p>
                              <div className="container-func">
                                 <button><i className="bi bi-gear"></i></button>
                                 <button><i className="bi bi-x-lg"></i></button>
                              </div>
                           </div>
                           <div className="main-order-pending">
                              <Link href="#!">
                                 <p>ID</p>
                              </Link>
                              <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}1669736859_hi-tea-yuzu-tran-chau_400x400.png`} alt="" />
                              <p>Tên danh mục</p>
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
   )
}

export default CategoryAdmin;