"use client"
import React, { useContext, useState } from "react";
import "../../../../../public/css/detail.css";
import "../../../../../public/css/login_register.css";
import useSWR from "swr";
import axios from "axios";
import { CartContex } from "@/app/context/cartContext";

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

function ProductDetail({ params }: { params: { id: string } }) {
   const [size_pro, setSize_pro] = useState('S');
   const [quantity_pro, setQuantityPro] = useState(1);
   // Fetch API Product detail
   const fetcher = (url: string) => axios.get(url).then(res => res.data);
   const {data, error} = useSWR<ProductInterface>(`${process.env.NEXT_PUBLIC_API_URL}/detailProduct/${params.id}`, fetcher);
   if (error) return <strong className="fetch">Không tải được chi tiết sản phẩm</strong>
   if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>

   // Sử dụng Context
   const context = useContext(CartContex);
   if (!context) {
      throw new Error('Trang chi tiết sản phẩm phải được sử dụng trong CartProvider!');
   }
   const {addItem} = context;

   // Sự kiện thêm sản phẩm vào giỏ hàng
   const handleAddToCart = (product: ProductInterface) => {
      console.log({...product, quantity_pro: quantity_pro, size_pro: size_pro})
      if (product) {
         addItem({...product, quantity_pro: quantity_pro, size_pro: size_pro});
      }
   }

   return (
      <>
         {/* Banner title other page on website Vegist */}
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / {data.name_pro}</p>
            </div>
         </section>

         {/* Main body product detail */}
         <main className="body-product-detail">
            <div className="boxcenter">
               <div className="container-body-product-detail">
                  <section className="main-img-product-detail">
                     <div className="top-big-img-product-detail">
                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${data.img_pro}`} alt="" />
                     </div>
                  </section>

                  <section className="main-info-product-detail">
                     <div className="name-product-detail">
                        <h1>{data.name_pro}</h1>
                     </div>

                     <div className="price-sale-product-detail">
                        {
                           data.sale_pro != 0 ? (
                              <>
                                 <p className="price-product-detail">{data.sale_pro.toLocaleString()}đ</p>
                                 <p className="sale-product-detail">{data.price_pro.toLocaleString()}đ</p>
                              </>
                           ) : (
                              <p className="price-product-detail">{data.price_pro.toLocaleString()}đ</p>
                           )
                        }
                     </div>

                     <div className="short-description-product-detail">
                        <p>{data.disc_pro}</p>
                     </div>

                     <div className="sizeAndFlavour-product-detail">
                        <p>
                           Size: <span>{size_pro}</span>
                        </p>
                        <div className="items-inputRadio-detail items-inputRadio-detail__size">
                           <input 
                              type="radio" 
                              name="size_pro_detail" 
                              id="small"
                              value="S"
                              checked={size_pro == 'S'}
                              onChange={(e) => setSize_pro(e.target.value)}
                           />
                           <label htmlFor="small">Small</label>

                           <input 
                              type="radio" 
                              name="size_pro_detail" 
                              id="medium" 
                              value="M"
                              checked={size_pro == 'M'}
                              onChange={(e) => setSize_pro(e.target.value)}
                           />
                           <label htmlFor="medium">Medium</label>

                           <input 
                              type="radio" 
                              name="size_pro_detail" 
                              id="large" 
                              value="L"
                              checked={size_pro == 'L'}
                              onChange={(e) => setSize_pro(e.target.value)}
                           />
                           <label htmlFor="large">Large</label>
                        </div>
                     </div>

                     <div className="quantity-pro">
                        <div className="container-quantity-pro">
                           <p>Quantity:</p>
                           <input type="number" defaultValue={1} onChange={(e) => setQuantityPro(Number(e.target.value))} />
                        </div>
                     </div>

                     <div className="container-button-pro-detail">
                        <button onClick={() => handleAddToCart(data)} className="main-btn main-btn__addCartDetail">Thêm vào giỏ hàng</button>
                        <a href="#!">
                           <button className="main-btn main-btn__buyDetail">Buy it now</button>
                        </a>
                     </div>

                     <p className="id-product-detail">
                        IDENTIFIER: <span>{data._id}</span>
                     </p>
                  </section>

                  <section className="special-offer">
                     <div className="item-special-offer">
                        <div className="main-icon-offer">
                           <i className="bi bi-truck"></i>
                        </div>
                        <div className="title-offer">
                           <h2>GIAO HÀNG</h2>
                        </div>
                        <div className="content-offer">
                           <p>Với chỉ tiêu giao hàng tiện lợi và nhanh chóng, đảm bảo cho bạn có trải nghiệm tốt nhất.</p>
                        </div>
                     </div>

                     <div className="item-special-offer">
                        <div className="main-icon-offer">
                           <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="title-offer">
                           <h2>GIÁ THÀNH</h2>
                        </div>
                        <div className="content-offer">
                           <p>Đảm bảo giá thành đi đôi với chất lượng, với đa dạng nhiều loại mặt hàng với các mức giá ưu đãi.</p>
                        </div>
                     </div>
                  </section>
               </div>
            </div>
         </main>

         {/* Tab product detail  */}
         <section className="product-detail-tab">
            <div className="title-tab-product-detail">
               <div className="list-tab">
                  <a className="active" href="#!">
                     BÌNH LUẬN
                  </a>
               </div>
            </div>
            <div className="body-content-tab-product-detail">
               <div className="boxcenter">
                  <div className="tab-review" id="tab-review">
                     <div className="form-review-customer">
                        <form action="">
                           <div className="title-form-review">
                              <h2>
                                 Bình luận của bạn được viết tại đây
                              </h2>
                           </div>
                           <div className="item-input-form-review">
                              <label htmlFor="name-user">Tên khách hàng</label>
                              <input type="text" id="name-user" placeholder="Nhập tên của bạn" />
                           </div>
                           <div className="item-input-form-review">
                              <label htmlFor="email-user">Email</label>
                              <input type="text" id="email-user" placeholder="example@gmail.com" />
                           </div>
                           <div className="item-input-form-review">
                              <label htmlFor="content-review">Nội dung bình luận (1500)</label>
                              <textarea placeholder="Hãy nêu cảm nghĩ của bạn ở đây..." id="content-review"></textarea>
                           </div>
                           <div className="btn-submit-review">
                              <button className="main-btn main-btn__submit-review">Gửi bình luận</button>
                           </div>
                        </form>
                     </div>
                     <div className="container-content-review-customer">
                        <div className="single-review-customer">
                           <div className="name-customer">
                              <h3>Jonhehe</h3>
                           </div>
                           <div className="date-review">
                              <p>May 08, 2023</p>
                           </div>
                           <div className="main-content-review-customer">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                           </div>
                        </div>
                        <div className="single-review-customer">
                           <div className="name-customer">
                              <h3>Jonhehe</h3>
                           </div>
                           <div className="date-review">
                              <p>May 08, 2023</p>
                           </div>
                           <div className="main-content-review-customer">
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
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

export default ProductDetail;
