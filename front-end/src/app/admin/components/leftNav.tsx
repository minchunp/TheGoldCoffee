"use client";
import Link from "next/link";
import "../../../../public/css/mainAdmin.css";
import logoWebAdmin from "../../../../public/images/The Gold Coffee Logo SVG.png";
import { usePathname } from "next/navigation";

const LeftNav = () => {
   const pathName = usePathname();
   return (
      <>
         <div className="menu-right">
            {/* <!-- Logo website admin --> */}
            <div className="logo-website">
               <Link href="/admin">
                  <img src={logoWebAdmin.src} alt="" />
               </Link>
            </div>

            {/* <!-- Menu website admin --> */}
            <div className="container-items-menu">
               <Link href="/admin">
                  <div className={`items ${pathName == "/admin" ? "active" : ""}`}>Dashboard</div>
               </Link>
               <Link href="/admin/products">
                  <div className={`items ${pathName == "/admin/products" || pathName == "/admin/products/add" || pathName == "/admin/products/edit" ? "active" : ""}`}>Sản phẩm</div>
               </Link>
               <Link href="/admin/categories">
                  <div className={`items ${pathName == "/admin/categories" || pathName == "/admin/categories/add" || pathName == "/admin/categories/edit" ? "active" : ""}`}>Danh mục</div>
               </Link>
               <Link href="/admin/users">
                  <div className={`items ${pathName == "/admin/users" || pathName == "/admin/users/add" || pathName == "/admin/users/[id]" ? "active" : ""}`}>Người dùng</div>
               </Link>
               <Link href="/admin/toppings">
                  <div className={`items ${pathName == "/admin/toppings" || pathName == "/admin/toppings/add" || pathName == "/admin/toppings/edit" ? "active" : ""}`}>Topping</div>
               </Link>
               <Link href="/admin/orders">
                  <div className={`items ${pathName == "/admin/orders" || pathName == "/admin/orderDetail" ? "active" : ""}`}>Đơn hàng</div>
               </Link>
            </div>

            {/* <!-- Menu website admin --> */}
            <div className="container-items-menu">
               <h1>PAGES</h1>
               <div className="items">Contact</div>
               <div className="items">Invoice</div>
               <div className="items">Team</div>
            </div>

            {/* <!-- Menu website admin --> */}
            <div className="container-items-menu">
               <div className="items">Cài đặt</div>
               <Link href="/">
                  <div className="items">Về trang chủ</div>
               </Link>
            </div>
         </div>
      </>
   );
};

export default LeftNav;
