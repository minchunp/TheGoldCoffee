"use client"
import Link from "next/link";
import "../../../../../public/css/navbar.css"
import { useContext } from "react";
import { CartContex } from "@/app/context/cartContext";
import logoWebsiteURL from "../../../../../public/images/The Gold Coffee Logo SVG.png";

export default function Navbar() {
    // Sử dụng Context
    const context = useContext(CartContex);
    if (!context) {
       throw new Error("Trang giỏ hàng phải được sử dụng trong CartProvider!");
    }
    const { items, removeItem, clearItem } = context;
    console.log(items)

   return (
      <>
         <nav className="main-nav">
            <div className="boxcenter">
               <div className="top-nav">
                  <div className="container-top-nav">
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span><a href="#!">123 cửa hàng</a></span> trên khắp cả nước</p>
                     </div>
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span>Liên hệ đặt hàng tại:</span> 0123 456 789</p>
                     </div>
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span>100% SẢN PHẨM</span> được kiểm định chất lượng</p>
                     </div>
                  </div>
               </div> 

               <div className="bottom-nav">
                  <div className="container-bottom-nav">
                     <div className="main-logo-website">
                        <Link href="/">
                           <img src={logoWebsiteURL.src} alt="" />
                        </Link>
                     </div>
                     <div className="right-func-bottom-nav">
                        <div className="input-search-nav">
                           <input type="text" placeholder="Bạn muốn tìm kiếm gì..." />
                           <i className="bi bi-search"></i>
                        </div>
                        <div className="func-user-nav">
                           <Link className="func-account" href="/login"><i className="bi bi-person"></i></Link>
                           <Link className="func-cart" href="/cart">
                              <div id="cart-count">{items.length}</div>
                              <i className="bi bi-bag"></i>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>  
            </div>

            {/* Main menu */}
            <div className="main-menu">
               <div className="boxcenter">
                  <div className="container-main-menu">
                     <div className="main-browse-cate">
                        <i className="bi bi-list"></i>
                        <p>Danh mục sản phẩm</p>
                        <i className="bi bi-chevron-down"></i>
                     </div>
                     <div className="menu">
                        <div className="item-menu"><a href="#!">Trang chủ</a></div>
                        <div className="item-menu"><a href="#!">Chuyện nhà</a></div>
                        <div className="item-menu"><a href="#!">Cửa hàng</a></div>
                        <div className="item-menu"><a href="#!">Khuyến mãi</a></div>
                        <div className="item-menu"><a href="#!">Tuyển dụng</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
}