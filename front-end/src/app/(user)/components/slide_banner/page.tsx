import useSWR from "swr";
import "../../../../../public/css/slide.css";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";

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

export default function Slide() {
   const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      sslidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2300,
   };

   // FetchAPI Demo products
   const fetcher = (url: string) => axios.get(url).then(res => res.data); 
   const {data, error} = useSWR<ProductInterface[]>(`${process.env.NEXT_PUBLIC_API_URL}/productsBySales?limit=${3}`, fetcher);
   if (error) return <strong className="fetch">Không tải được thông tin sản phẩm demo</strong>
   if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>

   return (
      <>
         <div className="main-slide">
            <div className="boxcenter">
               <div className="container-main-slide">
                  <div className="list-slide-show">
                     <Slider {...settings}>
                        <div className="container-slide">
                           <div className="single-slide">
                              <img src="images/slide_bannerNew_1.png" alt="" />
                              <div className="content-slide content-slide_1">
                                 <h1>Tận hưởng coffee vào buổi sáng</h1>
                                 <p>Tăng năng suất và cải thiện tâm trạng của bạn với một tách cà phê vào buổi sáng, 100% tự nhiên từ vườn.</p>
                                 <button className="main-btn main-btn__banner">Thử ngay</button>
                              </div>
                           </div>
                        </div>
                        <div className="container-slide">
                           <div className="single-slide">
                              <img src="images/slide_bannerNew_2.png" alt="" />
                              <div className="content-slide content-slide_2">
                                 <button className="main-btn main-btn__banner-2">Thử ngay</button>
                              </div>
                           </div>
                        </div>
                     </Slider>
                  </div>
                  <div className="demo-pro-in-slide">
                     <div className="container-demo-pro">
                        {
                           data.map(proDemo => {
                              return (
                                 <div className="demo-pro">
                                    <Link href={`/product/${proDemo._id}`} className="img-demo-pro">
                                       <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${proDemo.img_pro}`} alt="" />
                                    </Link>
                                    <div className="content-demo-pro">
                                       <Link href={`/product/${proDemo._id}`}><h4>{proDemo.name_pro}</h4></Link>
                                       {proDemo.sale_pro > 0 ? 
                                          <div className="price-demo-pro">
                                             <p>{proDemo.sale_pro.toLocaleString()}đ</p>
                                             <p>{proDemo.price_pro.toLocaleString()}đ</p>
                                          </div>
                                       : 
                                          <div className="price-demo-pro">
                                             <p>{proDemo.price_pro.toLocaleString()}đ</p>
                                          </div>
                                       }
                                       <p>Lượt bán: <span>{proDemo.salesVolume_pro}</span></p>
                                    </div>
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
