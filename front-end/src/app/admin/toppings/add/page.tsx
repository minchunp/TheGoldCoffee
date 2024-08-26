"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../../../public/css/addProductAdmin.css";
import axios from "axios";
import router from "next/router";

interface Category {
   _id: string;
   img_cate: string;
   name_cate: string;
   status_cate: string;
}

const AddTopping: React.FC = () => {
   const [categories, setCategories] = useState<Category[]>([]);
   const [idCate, setIdCate] = useState("");
   const [name, setName] = useState("");
   const [image, setImage] = useState<File | null>(null); // Giữ lại kiểu File
   const [price, setPrice] = useState("");
   const [status, setStatus] = useState(false);

   useEffect(() => {
      axios
         .get("http://localhost:3001/CategorysAPI/listCategory")
         .then((response) => {
            setCategories(response.data);
         })
         .catch((error) => {
            console.error("Error fetching toppings:", error);
         });
   }, []);

   const handleAddTopping = async () => {
      try {
         const imageName = image ? image.name : "";
         const toppingData = {
            id_cate: idCate,
            img_topping: imageName,
            name_topping: name,
            price_topping: parseInt(price.replace(/\./g, ""), 10), // Chuyển đổi giá thành số nguyên,
            status_topping: status ? "1" : "0",
         };
         const response = await axios.post("http://localhost:3001/toppingsAPI/create", toppingData, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         console.log("Topping added successfully:", response.data);
         window.location.href = "/admin/toppings";
      } catch (error) {
         console.error("Error adding topping:", error);
      }
   };

   const formatPrice = (value: string) => {
      const num = parseInt(value.replace(/\./g, ""), 10);
      return num ? num.toLocaleString("vi-VN") : "";
   };

   return (
      <>
         <section>
            <div id="add-product-page" className="add-product">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Thêm topping</h1>
                     <Link href="/admin/toppings">
                        <i id="return-main-product-btn" className="bi bi-arrow-left-short"></i>
                     </Link>
                  </div>

                  <div className="container-add-product">
                     <div className="box-demo-add">
                        <div className="box-featured-product">
                           <div className="product-image">
                              {!image && (
                                 <div className="box-toggle-image">
                                    <i className="bi bi-image"></i>
                                 </div>
                              )}
                              {image && ( // Hiển thị ảnh mới nếu có
                                 <img src={URL.createObjectURL(image)} alt="Product" />
                              )}
                           </div>
                           <div className="product-content">
                              <div className="product-name">
                                 <a href="#">
                                    <h3>{name || "Tên sản phẩm"}</h3>
                                 </a>
                              </div>

                              <div className="product-price">
                                 <p>{price ? `${formatPrice(price)} đ` : "Giá sản phẩm"}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="box-input-add">
                        <div className="element-input">
                           <p>Tên sản phẩm</p>
                           <input type="text" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="element-input">
                           <p>Tên danh mục</p>
                           <select value={idCate} onChange={(e) => setIdCate(e.target.value)}>
                              <option value="">Chọn danh mục</option>
                              {categories.map((category) => (
                                 <option key={category._id} value={category._id}>
                                    {category.name_cate}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <div className="element-input">
                           <p>Ảnh sản phẩm</p>
                           <input
                              type="file"
                              onChange={(e) => {
                                 if (e.target.files) {
                                    setImage(e.target.files[0]);
                                 }
                              }}
                           />
                        </div>
                        <div className="element-input">
                           <p>Giá sản phẩm</p>
                           <input type="text" placeholder="Giá sản phẩm" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="element-input">
                           <p>Status</p>
                           <input type="checkbox" id="tagSale-product" checked={status} onChange={(e) => setStatus(e.target.checked)} />
                        </div>
                        <button id="add-product" onClick={handleAddTopping}>
                           Thêm sản phẩm
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default AddTopping;
