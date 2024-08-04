import Link from "next/link";
import "../../../../public/css/productAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";

const ToppingAdmin = () => {
   return (
      <>
         {/* <!-- Section products --> */}
         <section>
            <div id="main-product-page" className="main-product">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Toppings</h1>
                     <Link href="/admin/toppings/add">
                        <i id="add-product-page-btn" className="bi bi-plus"></i>
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

                  <div id="container-product-admin" className="container-product">
                     <div className="box-featured-product">
                        <div className="product-image">
                           <img
                              className="detail"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}1669736859_hi-tea-yuzu-tran-chau_400x400.png`}
                              alt=""
                           />
                        </div>

                        <div className="product-content">
                           <div className="product-name">
                              <a href="#">
                                 <h3>Name</h3>
                              </a>
                           </div>

                           <div className="product-price">
                              <p>45000đ</p>
                           </div>
                        </div>

                        <div className="double-button">
                           <button className="openEditProduct" data-id="${item.id}">
                              Sửa sản phẩm
                           </button>
                           <button className="deleteProduct" data-id="${item.id}">
                              Xoá sản phẩm
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default ToppingAdmin;
