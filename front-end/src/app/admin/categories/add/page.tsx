"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../../../public/css/addProductAdmin.css";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";
import axios from "axios";

interface Category {
  _id: string;
  img_cate: string;
  name_cate: string;
  status_cate: string;
}

const AddCate: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState(true);

  const handleAddCategory = async () => {
    try {
      const imageName = image ? image.name : "";
      const cateData = {
        img_cate: imageName,
        name_cate: name,
        status_cate: status ? "1" : "0",
      };
      const response = await axios.post(
        "http://localhost:3001/category/add",
        cateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Category added successfully", response.data);
      window.location.href = "/admin/categories";
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };
  return (
    <>
      <section>
        <div id="add-product-page" className="add-product">
          <div className="boxcenter">
            <div className="title-product">
              <h1>Thêm Danh Mục</h1>
              <Link href="/admin/categories">
                <i
                  id="return-main-product-btn"
                  className="bi bi-arrow-left-short"></i>
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
                        <h3>{name || "Tên danh mục"}</h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-input-add">
                <div className="element-input">
                  <p>Tên danh mục</p>
                  <input
                    type="text"
                    placeholder="Tên danh mục"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="element-input">
                  <p>Ảnh danh mục</p>
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
                  <p>Status</p>
                  <input
                    type="checkbox"
                    id="tagSale-product"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                  />
                </div>
                <button id="add-product" onClick={handleAddCategory}>
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

export default AddCate;
