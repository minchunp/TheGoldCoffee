"use client";

import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import "../../../../../public/css/addProductAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  _id: string;
  img_cate: string;
  name_cate: string;
  status_cate: string;
}

function EditCate({ params }: { params: { id: string } }) {
  const [categories, setCategories] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/CategorysAPI/getCategory/${params.id}`)
      .then((response) => {
        const cateData = response.data;
        setCategories(cateData);
        setName(cateData.name_cate);
        setStatus(cateData.status_cate === "1");
      })
      .catch((err) => {
        console.error("Error fetch Category:", err);
      });
  }, [params.id]);

  const handleAddCate = async () => {
    try {
      const imageName = image ? image.name : categories?.img_cate || "";

      const cateData = {
        _id: params.id,
        img_cate: imageName,
        name_cate: name,
        status_cate: status ? "1" : "0",
      };

      const response = await axios.put(
        `http://localhost:3001/category/update/${params.id}`,
        cateData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Category update successfully:", response.data);
      window.location.href = "/admin/categories";
    } catch (err) {
      console.error("Error upadte category:", err);
    }
  };
  return (
    <section>
      <div id="add-product-page" className="add-product">
        <div className="boxcenter">
          <div className="title-product">
            <h1>Cập nhật danh mục</h1>
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
                  {!image && categories && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_CATE_URL}${categories.img_cate}`}
                      alt={name}
                    />
                  )}
                  {image && (
                    <img src={URL.createObjectURL(image)} alt="Category" />
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
                  id="name-product"
                  placeholder="Tên danh mục"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <p>Trạng thái</p>
                <input
                  type="checkbox"
                  id="tagSale-product"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              </div>
              <button id="add-product" onClick={handleAddCate}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditCate;