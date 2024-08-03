"use client";
import { useSelector } from "react-redux";
import "../../../../public/css/cart.css";
import "../../../../public/css/login_register.css";
import { RootState } from "@/redux/store";
import { useContext, useEffect } from "react";
import { CartContex } from "@/app/context/cartContext";
import Link from "next/link";

const Cart = () => {
   // Sử dụng Context
   const context = useContext(CartContex);
   if (!context) {
      throw new Error("Trang giỏ hàng phải được sử dụng trong CartProvider!");
   }
   const { items, removeItem, clearItem } = context;
   console.log(items)

   return (
      <>
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Giỏ hàng của bạn</p>
            </div>
         </section>

         {/* Main body cart  */}
         <main className="body-cart">
            <div className="boxcenter">
               <div className="container-body-cart">
                  <div className="main-cart">
                     <div className="title-cart">
                        <p>Sản phẩm</p>
                        <p>Số lượng</p>
                        <p>Tổng tiền</p>
                     </div>

                     <div className="body-product-in-cart">
                        {
                           items && items.length > 0 ? (
                              items.map((item) => (
                                 <div key={item._id} className="product-in-cart">
                                    <div className="product-cart product-cart__infor">
                                       <a href="#!">
                                          <div className="img-product-cart">
                                             <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${item.img_pro}`} alt="" />
                                          </div>
                                       </a>
                                       <div className="main-infor-product-cart">
                                          <a className="name-product-cart" href="#!">
                                             {item.name_pro}
                                          </a>
                                          <p className="price-product-cart">{item.price_pro.toLocaleString()}đ</p>
                                          <p className="size-flavout-product-cart">
                                             Size: <span>{item.size_pro}</span>
                                          </p>
      
                                          {/* Delete product in shopping cart index */}
                                          <div className="delete-product-shopping-cart-index">
                                             <button onClick={() => removeItem(item._id, item.size_pro)} className="delete-item-cart">
                                                <i className="bi bi-trash3"></i>
                                             </button>
                                          </div>
                                       </div>
                                    </div>
      
                                    <div className="container-quantity-cart">
                                       <div className="quantity-pro-cart">
                                          <input type="number" defaultValue={item.quantity_pro}/>
                                       </div>
                                    </div>
      
                                    <div className="product-cart product-cart__total">
                                       <p className="total-product-cart">{
                                          item.sale_pro != 0 ? ((item.sale_pro)*(item.quantity_pro)).toLocaleString() : ((item.price_pro)*(item.quantity_pro)).toLocaleString()   
                                       }đ</p>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="error-empty-cart">Không có sản phẩm trong giỏ hàng</div>
                           )
                        }
                     </div>

                     <div className="footer-main-cart">
                        <div className="discount-cart">
                           <div className="main-discount-cart-input">
                              <div className="icon-gift-onInput-discount">
                                 <i className="bi bi-gift"></i>
                              </div>
                              <input className="discount-cart-input" type="text" placeholder="Mã khuyến mãi" name="discount_code_cart" />
                           </div>
                           <div className="icon-submit-discount">
                              <i className="bi bi-arrow-right-short"></i>
                           </div>
                        </div>

                        <div className="button-return-store">
                           <Link href="/">
                              <button className="main-btn main-btn__returnStore">Quay về trang chủ</button>
                           </Link>
                        </div>
                     </div>
                  </div>

                  <div className="main-shipping-estimates">
                     <div className="box-subtotal-cart">
                        <h1>Ước tính vận chuyển</h1>
                        <div className="input-country-shipping">
                           <p>Địa chỉ</p>
                           <select name="country-shipping">
                              <option value="vietnam">Viet Nam</option>
                              <option value="England">England</option>
                              <option value="singapore">Singapore</option>
                              <option value="thailand">ThaiLand</option>
                           </select>
                        </div>

                        <div className="result-subtotal">
                           <p className="title-subtotal">Tổng thanh toán</p>
                           <p className="price-subtotal">0đ</p>
                           
                        </div>
                        <p className="paragraph-on-boxShipping">Quý khách xem kĩ giỏ hàng trước khi thanh toán.</p>

                        <button className="main-btn main-btn__checkout-shipping">Thanh toán</button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default Cart;
