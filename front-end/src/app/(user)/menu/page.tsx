"use client"
import "../../../../public/css/menu.css";
import "../../../../public/css/login_register.css";
import { fetchProducts } from "@/app/api";
import useSWR from "swr";
import Product from "../components/product/page";
import ButtonScrollTop from "../components/buttonScrollTop/page";
import React from "react";

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

export default function Menu() {
   // Fetch API all product on menu
   const fetcher = (url: string) => fetchProducts();
   const {data, error} = useSWR<ProductInterface[]>('listProduct', fetcher);
   if (error) return <strong className="fetch">Có lỗi xảy ra!</strong>;
   if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>
   
   return (
      <>
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Menu cửa hàng</p>
            </div>
         </section>

         <main className="body-menu">
            {/* Import button scroll to top */}
            <ButtonScrollTop/>
            <div className="boxcenter">
               <div className="container-body-menu">
                  <div className="list-cate-menu">
                     <div className="items-cateBox">
                        <h2>Danh mục</h2>
                        <div className="container-items-cateBox">
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="1">Danh mục 1
                                    <input type="radio" id="1" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>

                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="2">Danh mục 2
                                    <input type="radio" id="2" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>

                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 3
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 4
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 5
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 6
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 7
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 8
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="3">Danh mục 9
                                    <input type="radio" id="3" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                        </div>
                     </div>

                     <div className="items-cateBox">
                        <h2>Tình trạng sản phẩm</h2>
                        <div className="container-items-cateBox availability-menu">
                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="1">Còn hàng
                                    <input type="radio" id="1" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>

                           <div className="input-items-cateBox">
                              <div className="boxInput-cate">
                                 <label htmlFor="2">Hết hàng
                                    <input type="radio" id="2" name="cate-menu" />
                                    <span className="checkmark"></span>
                                 </label>
                              </div>
                              <p className="quantity-pro-cate-menu">(1)</p>
                           </div>
                        </div>
                     </div>

                     <div className="banner-list-cate-menu">
                        <img src="images/small-banner-menu.png" alt="" />
                     </div>
                  </div>

                  <div className="list-pro-menu">
                     <h2>Các sản phẩm</h2>
                     <div className="main-banner-list-pro-menu">
                        <img src="images/big-banner-menu.png" alt="" />
                     </div>
                     <div className="container-form-list">
                        <div className="items-form-list">
                           <div className="item-form-list active">
                              <i className="bi bi-columns-gap" />
                           </div>
                           <div className="item-form-list">
                              <i className="bi bi-list-task" />
                           </div>
                        </div>
                        <div className="title-cate-list-pro-menu">
                           <h3>Tất cả sản phẩm (80)</h3>
                        </div>
                     </div>
                     <div className="container-list-pro-menu">
                        {
                           data.map(pro => {
                              return (
                                 <Product product={pro}/>
                              )
                           })
                        }
                     </div>
                     <div className="container-numerical-order">
                        <div className="numerical-order">
                           <div className="item-numerical-order">
                              <i className="bi bi-chevron-double-left" />
                           </div>
                           <div className="item-numerical-order active">1</div>
                           <div className="item-numerical-order">2</div>
                           <div className="item-numerical-order">3</div>
                           <div className="item-numerical-order">
                              <i className="bi bi-chevron-double-right" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}
