"use client";
import "../../../../public/css/menu.css";
import "../../../../public/css/login_register.css";
import { fetchProducts } from "@/app/api";
import { fetchCategories } from "@/app/api";
import useSWR from "swr";
import Product from "../components/product/page";
import Category from "../components/category/Cate";
import ButtonScrollTop from "../components/buttonScrollTop/page";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { count } from "console";

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

interface CategoryInterface {
   _id: string;
   img_cate: string;
   name_cate: string;
   status_cate: string;
}



export default function Menu() {
   // // Fetch API all product on menu
   // const fetcher = (url: string) => fetchProducts();
   // const { data, error } = useSWR<ProductInterface[]>("listProduct", fetcher);

   // // Fetch Api all categories on menu
   // const fetcherCate = (url: string) => fetchCategories();
   // const { data: categories, error: errorCategories } = useSWR<CategoryInterface[]>("listCategory", fetcherCate);

   const fetcher = async (url: string, fetchFunction: () => Promise<any>) => {
      return fetchFunction();
   };

   // Fetch Products
   const { data: products, error: errorProducts } = useSWR<ProductInterface[]>(
      ["listProduct"], 
      () => fetcher("listProduct", fetchProducts)
   );

   // Fetch Categories
   const { data: categories, error: errorCategories } = useSWR<CategoryInterface[]>(
      ["listCategory"], 
      () => fetcher("listCategory", fetchCategories)
   );

   // Pagination State
   const [currentPage, setCurrentPage] = useState(0); // Current page
   const productsPerPage = 12; // Number of products per page
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
   const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
   

   if (errorProducts) {
      return <strong className="fetch">Error loading products</strong>;
   }
   if (!products) {
      return <strong className="fetch">Loading products...</strong>;
   }

   if (errorCategories) {
      return <strong className="fetch">Error loading categories</strong>;
   }
   if (!categories) {
      return <strong className="fetch">Loading categories...</strong>;
   }

   // Filter sản phẩm theo cate
   const filteredProducts = selectedCategory ? products.filter((pro) => pro.id_cate === selectedCategory) : products;
   // Filter sản phẩm theo status
   const filteredStatus = selectedStatus ? products.filter((pro) => pro.status_pro === selectedStatus) : products;
   // Count sản phẩm 
   

   const handleCategoryClick = (categoryId: string) => {
      setSelectedCategory(categoryId);
      setCurrentPage(0); // Reset về trang đầu tiên
   };
   
   const offset = currentPage * productsPerPage;
   const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
   const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

   
   const handlePageClick = (selectedItem: { selected: number }) => {
      setCurrentPage(selectedItem.selected);
   };
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
                              {
                              categories.map(pro => {
                                 const countProduct = products.filter(count => count.id_cate === pro._id).length;
                                 return (
                                    <div key={pro._id} 
                                    className={`input-items-cateBox ${selectedCategory === pro._id ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(pro._id)}>
                                    <Category category={pro}/>
                                    <p className="quantity-pro-cate-menu">({countProduct})</p>
                                    </div>
                                 )
                              })
                           }
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
                              <p className="quantity-pro-cate-menu">1</p>
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

                  {/*  */}
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
                  <h3>Tất cả sản phẩm ({filteredProducts.length})</h3>
                  </div>
               </div>

               {/* Product List */}
               <div className="container-list-pro-menu">
                  {currentProducts.map((pro) => (
                  <Product key={pro._id} product={pro} />
                  ))}
               </div>

               {/* Pagination Component */}
               <div className="container-numerical-order">
                  <div className="numerical-order">
                  <ReactPaginate
                     previousLabel="<<"
                     nextLabel=">>"
                     breakLabel="..."
                     onPageChange={handlePageClick}
                     pageCount={pageCount}
                     pageRangeDisplayed={3}
                     marginPagesDisplayed={1}
                     containerClassName="pagination justify-content-end"
                     pageClassName="page-item"
                     pageLinkClassName="page-link"
                     previousClassName="page-item"
                     previousLinkClassName="page-link"
                     nextClassName="page-item"
                     nextLinkClassName="page-link"
                     breakClassName="page-item"
                     breakLinkClassName="page-link"
                     activeClassName="active"
                     disabledClassName="disabled"
                  />
                  </div>
               </div>
                  </div>

               </div>
            </div>
         </main>
      </>
   );
}