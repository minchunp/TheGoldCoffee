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

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [idCate, setIdCate] = useState("");
  const [image, setImage] = useState<File | null>(null); // Giữ lại kiểu File
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [description, setDescription] = useState("");
  const [salesVolume, setSalesVolume] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/CategorysAPI/listCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAddProduct = async () => {
    try {
      const imageName = image ? image.name : "";

      const productData = {
        id_cate: idCate,
        img_pro: imageName,
        name_pro: name,
        price_pro: parseInt(price.replace(/\./g, ""), 10), // Chuyển đổi giá thành số nguyên
        sale_pro: parseInt(sale.replace(/\./g, ""), 10), // Chuyển đổi giá khuyến mãi thành số nguyên
        disc_pro: description,
        salesVolume_pro: salesVolume,
        status_pro: status ? "1" : "0",
      };

      // Gửi yêu cầu thêm sản phẩm
      const response = await axios.post(
        "http://localhost:3001/product/add",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product added successfully:", response.data);
      //CHUYỂN HƯỚNG VỀ http://localhost:3000/admin/products
      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Hàm format giá để hiển thị
  const formatPrice = (value: string) => {
    const num = parseInt(value.replace(/\./g, ""), 10);
    return num ? num.toLocaleString("vi-VN") : "";
  };

  return (
    <section>
      <div id="add-product-page" className="add-product">
        <div className="boxcenter">
          <div className="title-product">
            <h1>Add Product</h1>
            <Link href="/admin/products">
              <i
                id="return-main-product-btn"
                className="bi bi-arrow-left-short"
              ></i>
            </Link>
          </div>

          <div className="container-add-product">
            <div className="box-demo-add">
              <div className="box-featured-product">
                <div className="product-image">
                  {/* Ẩn box-toggle-image khi có ảnh mới */}
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
                <input
                  type="text"
                  id="name-product"
                  placeholder="Tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="element-input">
                <p>Tên danh mục</p>
                <select
                  value={idCate}
                  onChange={(e) => setIdCate(e.target.value)}
                >
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
                      setImage(e.target.files[0]); // Cập nhật ảnh mới
                    }
                  }}
                />
              </div>
              <div className="element-input">
                <p>Giá sản phẩm</p>
                <input
                  type="text"
                  id="price-product"
                  placeholder="Giá sản phẩm"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="element-input">
                <p>Giá khuyến mãi</p>
                <input
                  type="text"
                  id="sale-product"
                  placeholder="Giá khuyến mãi"
                  value={sale}
                  onChange={(e) => setSale(e.target.value)}
                />
              </div>
              <div className="element-input">
                <p>Mô tả sản phẩm</p>
                <input
                  type="text"
                  id="description-product"
                  placeholder="Mô tả sản phẩm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="element-input">
                <p>Lượt bán</p>
                <input
                  type="number"
                  placeholder="Lượt bán"
                  value={salesVolume}
                  onChange={(e) => setSalesVolume(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="element-input">
                <p>Trạng thái</p>
                <input
                  type="checkbox"
                  id="tagSale-product"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              </div>
              <button id="add-product" onClick={handleAddProduct}>
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
