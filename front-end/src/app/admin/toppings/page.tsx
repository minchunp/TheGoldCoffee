"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../../public/css/productAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import axios from "axios";

interface Topping {
   _id: string;
   img_topping: string;
   name_topping: string;
   price_topping: number;
   status_topping: string;
   };



const ToppingAdmin: React.FC = () => {
   const [toppings, setToppings] = useState<Topping[]>([]);

useEffect(() => {
   
   axios
         .get<Topping[]>("http://localhost:3001/toppingsAPI/listTopping")
         .then((response) => {
         setToppings(response.data);
         })
         .catch((error) => {
         console.error("Error fetching products:", error);
         });
   }, []);

const deleteTopping = (id: string) => {
   axios
         .delete(`http://localhost:3001/topping/delete/${id}`)
         .then((response) => {
         setToppings((prevProducts) =>
            prevProducts.filter((topping) => topping._id !== id)
         );
         })
         .catch((error) => {
         console.error("Error deleting product:", error);
         });
   };

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
                     {toppings.map((topping)=>(
                        <div className="box-featured-product">
                        <div className="product-image">
                           <img
                              className="detail"
                              src={`${process.env.NEXT_PUBLIC_IMAGE_TOPP_URL}${topping.img_topping}`}
                              alt={topping.name_topping}
                           />
                        </div>

                        <div className="product-content">
                           <div className="product-name">
                              <a href="#">
                                 <h3>{topping.name_topping}</h3>
                              </a>
                           </div>

                           <div className="product-price">
                              <p>{topping.price_topping}</p>
                           </div>
                        </div>

                        <div className="double-button">
                           <Link href={`/admin/toppings/${topping._id}`}>
                              <button className="openEditProduct">Sửa sản phẩm</button>
                           </Link>
                           <button className="deleteProduct" onClick={() => deleteTopping(topping._id)}>
                              Xoá sản phẩm
                           </button>
                        </div>
                     </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default ToppingAdmin;
