"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import axios from "axios";

interface Category {
  _id: string;
  img_cate: string;
  name_cate: string;
  status_cate: string;
}

const CategoryAdmin: React.FC = () => {
  const [cate, setCate] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:3001/CategorysAPI/listCategory")
      .then((response) => {
        setCate(response.data);
      })
      .catch((err) => {
        console.error("Error fetching category:", err);
      });
  }, []);

  const deleteCate = (id: string) => {
    axios
      .delete(`http://localhost:3001/category/delete/${id}`)
      .then((response) => {
        setCate((prevCate) => prevCate.filter((cate) => cate._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting Category:", err);
      });
  };
  return (
    <>
      <section>
        <div className="main-dashboard">
          <div className="boxcenter">
            <div className="title-product">
              <h1>Danh mục sản phẩm</h1>
              <Link href="/admin/categories/add">
                <i className="bi bi-plus"></i>
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

            <div className="order-pending">
              <div className="title-order-pending">
                <h1>Danh sách danh mục</h1>
              </div>

              <div id="list-cate" className="list-order-pending">
                <div className="title-list-order-pending">
                  <p>ID</p>
                  <p>Ảnh danh mục</p>
                  <p>Tên danh mục</p>
                  <p>Chức năng</p>
                </div>

                <div className="main-list">
                  {cate.map((catea) => (
                    <div className="main-order-pending">
                      <Link href="#!">
                        <p>{catea._id.slice(-4)}</p>
                      </Link>
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_CATE_URL}${catea.img_cate}`}
                        alt={catea.name_cate}
                      />
                      <p>{catea.name_cate}</p>
                      <div className="container-func">
                        <Link href={`/admin/categories/${catea._id}`}>
                          <button>
                            <i className="bi bi-gear"></i>
                          </button>
                        </Link>
                        {/* <button onClick={() => deleteCate(catea._id)}>
                          <i className="bi bi-x-lg"></i>
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryAdmin;
