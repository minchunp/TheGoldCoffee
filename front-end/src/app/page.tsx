import Image from "next/image";
import styles from "./page.module.css";
import "../../public/css/home.css";
import Navbar from "./components/navbar/page";
import Slide from "./components/slide_banner/page";
import ProductList from "./components/product/listProduct";

export default function Home() {
   return (
      <>
         <Navbar />
         <Slide />

         {/* Section What make us different? */}
         <section className="make-us-different">
            <div className="boxcenter">
               <h2 className="main-title">Điều gì làm chúng tôi khác biệt?</h2>

               <div className="container-make-us-different">
                  <div className="icon-makeus icon-makeus_1">
                     <img src="images/icon1_80x80_crop_center.webp" alt="" />
                     <p>Thân thiện với đường</p>
                  </div>

                  <div className="icon-makeus icon-makeus_2">
                     <img src="images/icon2_80x80_crop_center.webp" alt="" />
                     <p>Probiotics</p>
                  </div>

                  <div className="icon-makeus icon-makeus_3">
                     <img src="images/icon3_80x80_crop_center.webp" alt="" />
                     <p>Tươi mát</p>
                  </div>

                  <div className="icon-makeus icon-makeus_4">
                     <img src="images/icon4_80x80_crop_center.webp" alt="" />
                     <p>Không chứa gluten</p>
                  </div>

                  <div className="icon-makeus icon-makeus_5">
                     <img src="images/icon5_80x80_crop_center.webp" alt="" />
                     <p>18 Cals</p>
                  </div>

                  <div className="icon-makeus icon-makeus_6">
                     <img src="images/icon6_80x80_crop_center.webp" alt="" />
                     <p>Không rác thải</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Section Tea day */}
         <section className="tea-day">
            <div className="boxcenter">
              <div className="container-tea-day">
                <div className="content-tea-day">
                  <h2>Đa dạng nhiều loại trà</h2>
                  <p>Với hương vị nhẹ nhàng và thanh thoát, không chỉ là một thức uống quen thuộc mà còn là một phần quan trọng trong văn hóa nhiều quốc gia. Từ những lá trà tươi ngon được hái từ những đồi xanh mướt, trải qua quá trình chế biến tinh tế, mỗi tách trà đều mang trong mình sự tinh túy của thiên nhiên.</p>
                  <button className="main-btn main-btn__tea-day">Thử ngay</button>
                </div>
                <div className="main-img-tea-day">
                  <img src="images/banner_tea.png" alt="" />
                </div>
              </div>
            </div>
         </section>

         {/* Section Trending products */}
         <section className="trending-product">
            <div className="boxcenter">
              <h2 className="main-title">Sản phẩm nổi bật</h2>

              <ProductList/>
            </div>
         </section>
      </>
   );
}
