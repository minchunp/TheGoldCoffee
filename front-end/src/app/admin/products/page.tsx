"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../../public/css/productAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import axios from "axios";

// src/interfaces/Product.ts
interface Product {
  _id: string;
  id_cate: string;
  img_pro: string;
  name_pro: string;
  price_pro: number;
  sale_pro: number;
  disc_pro: string;
  salesVolume_pro: number;
  status_pro: string;
}

const ProductAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    axios
      .get<Product[]>("http://localhost:3001/productsAPI/listProduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const deleteProduct = (id: string) => {
    axios
      .delete(`http://localhost:3001/product/delete/${id}`)
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <>
      <section>
        <div id="main-product-page" className="main-product">
          <div className="boxcenter">
            <div className="title-product">
              <h1>Sản phẩm</h1>
              <Link href="/admin/products/add">
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
              {products.map((product) => (
                <div key={product._id} className="box-featured-product">
                  <div className="product-image">
                    <img
                      className="detail"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${product.img_pro}`}
                      alt={product.name_pro}
                    />

                    <div className="main-func">
                      <div className="container-func-pro">
                        <div className="function-product">
                          <div className="func-wishlist">
                            <i className="bi bi-heart"></i>
                          </div>
                          |
                          <div className="func-qich-view">
                            <i className="bi bi-search"></i>
                          </div>
                          |
                          <div className="func-add-cart">
                            <i
                              data-id={product._id}
                              className="bi bi-cart-plus btn-addCart"
                            ></i>
                          </div>
                          |
                          <div className="func-payment">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product-content">
                    <div className="product-name">
                      <a href="#">
                        <h3>{product.name_pro}</h3>
                      </a>
                    </div>

                    <div className="product-price">
                      <div className="sale-price">
                        <p>{product.price_pro}đ</p>
                        {product.sale_pro > 0 && (
                          <span>{product.sale_pro}đ</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="double-button">
                    <Link href={`/admin/products/${product._id}`}>
                      <button className="openEditProduct">Sửa sản phẩm</button>
                    </Link>
                    {/* <button
                      className="deleteProduct"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Xoá sản phẩm
                    </button> */}
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

export default ProductAdmin;
