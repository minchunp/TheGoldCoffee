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

function EditProduct({ params }: { params: { id: string } }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [idCate, setIdCate] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/productsAPI/detailProduct/${params.id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
        setName(productData.name_pro);
        setIdCate(productData.id_cate);
        setPrice(productData.price_pro.toString());
        setSale(productData.sale_pro.toString());
        setDescription(productData.disc_pro);
        setSalesVolume(productData.salesVolume_pro);
        setStatus(productData.status_pro === "1");
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [params.id]);

  const handleAddProduct = async () => {
    try {
      const imageName = image ? image.name : product?.img_pro || "";

      const productData = {
        _id: params.id,
        id_cate: idCate,
        img_pro: imageName,
        name_pro: name,
        price_pro: parseInt(price.replace(/\./g, ""), 10),
        sale_pro: parseInt(sale.replace(/\./g, ""), 10),
        disc_pro: description,
        salesVolume_pro: salesVolume,
        status_pro: status ? "1" : "0",
      };

      const response = await axios.put(
        `http://localhost:3001/product/update/${params.id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product update successfully:", response.data);
      // router.push("/admin/products");
      //CHUYỂN HƯỚNG VỀ http://localhost:3000/admin/products
      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Error update product:", error);
    }
  };

  const formatPrice = (value: string) => {
    const num = parseInt(value.replace(/\./g, ""), 10);
    return num ? num.toLocaleString("vi-VN") : "";
  };

  return (
    <section>
      <div id="add-product-page" className="add-product">
        <div className="boxcenter">
          <div className="title-product">
            <h1>Edit Product</h1>
            <Link href="/admin/products">
              <i
                id="return-main-product-btn"
                className="bi bi-arrow-left-short"></i>
            </Link>
          </div>

          <div className="container-add-product">
            <div className="box-demo-add">
              <div className="box-featured-product">
                <div className="product-image">
                  {!image && product && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${product.img_pro}`}
                      alt="Product"
                    />
                  )}
                  {image && (
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
                  onChange={(e) => setIdCate(e.target.value)}>
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
                Sửa sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProduct;
