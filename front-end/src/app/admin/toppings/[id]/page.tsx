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

    interface Topping {
    __id: string;
    img_topping: string;
    name_topping: string;
    price_topping: number;
    status_topping: string;
    }

    function EditProduct({ params }: { params: { id: string } }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [topping, setTopping] = useState<Topping | null>(null);
    const [name, setName] = useState("");
    const [idCate, setIdCate] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [price, setPrice] = useState("");
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
    .get(`http://localhost:3001/toppingsAPI/detailTopping/${params.id}`)
    .then((response) => {
    const toppingData = response.data;
    setTopping(toppingData);
    setName(toppingData.name_topping);
    setIdCate(toppingData.id_cate);
    setPrice(toppingData.price_topping.toString());
    setStatus(toppingData.status_topping === "1");
    })
    .catch((error) => {
    console.error("Error fetching product:", error);
    });
    }, [params.id]);

    const handleUpdate = async () => {
    try {
    const imageName = image ? image.name : topping?.img_topping || "";

    const toppingData = {
    _id: params.id,
    id_cate: idCate,
    img_topping: imageName,
    name_topping: name,
    price_topping: parseInt(price.replace(/\./g, ""), 10),
    status_topping: status ? "1" : "0",
    };

    const response = await axios.put(
    `http://localhost:3001/topping/update/${params.id}`,
    toppingData,
    {
        headers: {
        "Content-Type": "application/json",
        },
    }
    );

    console.log("Topping update successfully:", response.data);
    //CHUYỂN HƯỚNG VỀ http://localhost:3000/admin/toppings
    window.location.href = "/admin/toppings";
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
        <h1>Edit Topping</h1>
        <Link href="/admin/toppings">
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
                {!image && topping && (
                <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_TOPP_URL}${topping.img_topping}`}
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
            <p>Trạng thái</p>
            <input
                type="checkbox"
                id="tagSale-product"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
            />
            </div>
            <button id="add-product" onClick={handleUpdate}>
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
