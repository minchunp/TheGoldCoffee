"use client"
import "../../../public/css/home.css";
import Slide from "./components/slide_banner/page";
import ProductList from "./components/product/listProduct";
import BlogList from "./components/blog/listBlog";
import { fetchProducts } from "../api";
import useSWR from "swr";

interface ProductInterface {
   _id: string,
   id_cate: string
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   disc_pro: string,
   salesVolume_pro: number,
   status_pro: number
}

interface BLogInterface {
   _id: string,
   title_blog: string,
   img_blog: string,
   date_blog: string,
   content_blog: string,
   sumary_blog: string,
   status_blog: number
}

export default function Home() {
   // Fetch API Products
   const fetcher = (url: string) => fetchProducts();
   const {data, error} = useSWR<ProductInterface[]>(`listProduct`, fetcher);
   if (error) return <strong className="fetch">Có lỗi xảy ra!</strong>;
   if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>

   const blogList: BLogInterface[] = [
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      },
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      },
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      },
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      },
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      },
      {
         _id: "sfisnoifmodfosdmfosd",
         title_blog: "BẮT GẶP SÀI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ",
         img_blog: "thecoffeehouse_caphehighlight01_de40c0102a954c50a328f7befcdd82bd_grande.jpg",
         date_blog: "01/06/2024",
         content_blog: "",
         sumary_blog: "Dẫu qua bao nhiêu lớp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn thăng trầm của một Sài Gòn xưa cũ. Trên những góc phố,...",
         status_blog: 1
      }
   ]

   return (
      <>
         {/* <Navbar /> */}
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

            </div>
            <ProductList products={data} />
         </section>

         {/* Section Banner introduce */}
         <section className="banner-introduce">
            <div className="boxcenter">
               <img src="images/bannerQC.webp" alt="" />
               <div className="main-desc-bannerQC">
                  <div className="img-titleQC">
                     <img src="images/title_bannerQC.webp" alt="" />
                  </div>
                  <div className="desc-bannerQC">
                     <p>
                        Được trồng trọt và chăm chút kỹ lưỡng, nuôi dưỡng từ thổ nhưỡng phì nhiêu, nguồn nước mát lành, bao bọc bởi mây và sương cùng nền
                        nhiệt độ mát mẻ quanh năm, những búp trà ở Tây Bắc mập mạp và xanh mướt, hội tụ đầy đủ dưỡng chất, sinh khí, và tinh hoa đất
                        trời. Chính khí hậu đặc trưng cùng phương pháp canh tác của đồng bào dân tộc nơi đây đã tạo ra Trà Xanh vị mộc dễ uống, dễ yêu,
                        không thể trộn lẫn với bất kỳ vùng miền nào khác.
                     </p>
                  </div>
                  <div className="button-bannerQC">
                     <a href="#!">
                        <button className="main-btn main-btn__banner-introduce">Thử ngay</button>
                     </a>
                  </div>
               </div>
            </div>
         </section>

         {/* Section Blogs */}
         <section className="blogs">
            <div className="boxcenter">
               <h2 className="main-title">Chuyện nhà</h2>

               <BlogList blogs={blogList}/>
            </div>
         </section>

         {/* <Footer/> */}
      </>
   );
}
