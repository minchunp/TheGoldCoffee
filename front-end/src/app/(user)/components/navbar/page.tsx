"use client";
import Link from "next/link";
import "../../../../../public/css/navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContex } from "@/app/context/cartContext";
import logoWebsiteURL from "../../../../../public/images/The Gold Coffee Logo SVG.png";

export default function Navbar() {
   // Sử dụng Context
   const context = useContext(CartContex);
   if (!context) {
      throw new Error("Trang giỏ hàng phải được sử dụng trong CartProvider!");
   }
   const { items, removeItem, clearItem } = context;
   console.log(items);

   // Sử dụng useRef để thêm lớp sticky cho nav khi user scroll website
   const [isSticky, setIsSticky] = useState<boolean>(false);
   const sticky = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const handleScroll = () => {
         if (sticky.current) {
            const offset = sticky.current.getBoundingClientRect().top;
            if (window.scrollY - offset > 46) {
               setIsSticky(true);
            } else if (window.scrollY - offset == 46) {
               setIsSticky(false);
            }
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <>
         <nav className="main-nav">
            <div ref={sticky} className={`main-top-nav ${isSticky ? "sticky" : ""}`}>
               <div className="boxcenter">
                  <div className="top-nav">
                     <div className="container-top-nav">
                        <div className="item-top-nav">
                           <i className="bi bi-check2"></i>
                           <p>
                              <span>
                                 <a href="#!">123 cửa hàng</a>
                              </span>{" "}
                              trên khắp cả nước
                           </p>
                        </div>
                        <div className="item-top-nav">
                           <i className="bi bi-check2"></i>
                           <p>
                              <span>Liên hệ đặt hàng tại:</span> 0123 456 789
                           </p>
                        </div>
                        <div className="item-top-nav">
                           <i className="bi bi-check2"></i>
                           <p>
                              <span>100% SẢN PHẨM</span> được kiểm định chất lượng
                           </p>
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
                              {/* Xét điệu kiện:
                                 + Nếu không có user thì mở thẻ Link đang bị đóng ở dưới đóng phần main-user
                                 + Ngược lại
                              */}

                              {/* Khi không có user */}
                              {/* <Link className="func-account" href="/login"><i className="bi bi-person"></i></Link> */}

                              {/* Khi có user */}
                              <div className="main-user">
                                 <div className="func-account">
                                    <i className="bi bi-person"></i>
                                 </div>

                                 <div className="modal-user-login">
                                    <div className="func-main-modal">
                                       <a data-tooltip="Thông tin" href="#">
                                          <i className="bi bi-info"></i>
                                       </a>

                                       {/* Xét role: 
                                          + Nếu role: Admin thì mở thẻ này
                                          + Nếu role: User thì bỏ thẻ này đi
                                       */}
                                       <Link data-tooltip="Trang admin" href="/admin">
                                          <i className="bi bi-person-fill-gear"></i>
                                       </Link>
                                       
                                       <a data-tooltip="Đăng xuất" href="/logout">
                                          <i className="bi bi-box-arrow-left"></i>
                                       </a>
                                    </div>

                                    <div className="main-modal">
                                       <div className="image-user">
                                          <img src="images/avatarAccountUser.jpg" alt="" />
                                       </div>
                                       <div className="name-user">
                                          <a href="#">
                                             <h3>Minh Trung</h3>
                                          </a>
                                          <p>Admin</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <Link className="func-cart" href="/cart">
                                 <div id="cart-count">{items.length}</div>
                                 <i className="bi bi-bag"></i>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main menu */}
            <div className="main-menu">
               <div className="boxcenter">
                  <div className="container-main-menu">
                     <Link href="/menu">
                        <div className="main-browse-cate">
                           <i className="bi bi-list"></i>
                           <p>Menu sản phẩm</p>
                           <i className="bi bi-chevron-right"></i>
                        </div>
                     </Link>
                     <div className="menu">
                        <div className="item-menu">
                           <a href="#!">Trang chủ</a>
                        </div>
                        <div className="item-menu">
                           <a href="#!">Chuyện nhà</a>
                        </div>
                        <div className="item-menu">
                           <a href="#!">Cửa hàng</a>
                        </div>
                        <div className="item-menu">
                           <a href="#!">Khuyến mãi</a>
                        </div>
                        <div className="item-menu">
                           <a href="#!">Tuyển dụng</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
}
