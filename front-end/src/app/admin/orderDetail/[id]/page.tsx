"use client";

import React, { useEffect, useState } from "react";
import "../../../../../public/css/orderDetailAdmin.css";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";
import Link from "next/link";

function OrderDetailAdmin({ params }: { params: { id: string } }) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [pendingStatus, setPendingStatus] = useState<string>(""); // Trạng thái chưa xác nhận
  const [productDetails, setProductDetails] = useState<any[]>([]); // State để lưu thông tin sản phẩm

  const idod = params.id;

  // Bảng ánh xạ trạng thái ngắn gọn sang tên trạng thái đầy đủ
  const statusMapping: { [key: string]: string } = {
    order: "chờ xác nhận",
    confirm: "đã xác nhận",
    shipping: "đang giao hàng",
    success: "đã giao hàng",
    cancel: "huỷ đơn hàng",
  };

  const fetchOrderDetails = async () => {
    const response = await fetch(
      `http://localhost:3001/cartsAPI/detailOrder/${params.id}`
    );
    const data = await response.json();
    setOrderDetails(data);
    setStatus(data.status_order);

    // Gọi API cho từng sản phẩm để lấy thông tin chi tiết
    const products = await Promise.all(
      data.products.map(async (product: any) => {
        const productResponse = await fetch(
          `http://localhost:3001/productsAPI/proWithTopping/${product.productId}`
        );
        const productData = await productResponse.json();
        return { ...product, ...productData.product }; // Kết hợp thông tin sản phẩm
      })
    );

    setProductDetails(products);
  };

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPendingStatus(e.target.value); // Cập nhật trạng thái đã chọn nhưng chưa submit
  };

  const handleSubmitStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/cartsAPI/detailOrder/setSTT",
        {
          method: "POST", // Thay đổi thành POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: params.id, // Gửi id đơn hàng
            status_order: statusMapping[pendingStatus].toLowerCase(), // Gửi tên trạng thái đầy đủ và chuyển chữ cái đầu tiên thành chữ thường
          }),
        }
      );

      if (response.ok) {
        setStatus(statusMapping[pendingStatus]); // Cập nhật trạng thái tạm thời
        window.location.reload(); // Reload lại trang để cập nhật thông tin mới
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <>
      <section>
        <div className="main-order-detail">
          <div className="boxcenter">
            <div className="title-product">
              <h1>
                Hoá đơn chi tiết <span>#{idod}</span>
              </h1>
              <Link href="/admin/orders">
                <i className="bi bi-arrow-left-short"></i>
              </Link>
            </div>

            <div className="order-pending">
              <div className="title-order-pending">
                <h1>Danh sách sản phẩm</h1>
                <div className="infor-user-order">
                  <div className="name-user-order-detail">
                    <h3>Tên khách hàng:</h3>
                    <p>{orderDetails.name_user}</p>
                  </div>

                  <div className="address-user-order-detail">
                    <h3>Địa chỉ khách hàng:</h3>
                    <p>{orderDetails.address_user}</p>
                  </div>

                  <div className="address-user-order-detail">
                    <h3>Ngày - Thời gian đặt hàng:</h3>
                    <p>{new Date(orderDetails.date_order).toLocaleString()}</p>
                  </div>

                  <div className="address-user-order-detail">
                    <h3>Phương thức thanh toán:</h3>
                    <p>Tiền mặt</p>
                  </div>

                  <form onSubmit={handleSubmitStatusChange}>
                    <div className="status-user-order-detail">
                      <h3>Trạng thái:</h3>

                      {status === "chờ xác nhận" && (
                        <div className="status pending">
                          <select
                            name="status"
                            className="order"
                            value={pendingStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value="order">Chờ xác nhận</option>
                            <option value="confirm">Đã xác nhận</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="success">Đã giao hàng</option>
                            <option value="cancel">Huỷ đơn hàng</option>
                          </select>
                        </div>
                      )}

                      {status === "đã xác nhận" && (
                        <div className="status confirm">
                          <select
                            name="status"
                            className="confirm"
                            value={pendingStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value="confirm">Đã xác nhận</option>
                            <option value="order">Chờ xác nhận</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="success">Đã giao hàng</option>
                            <option value="cancel">Huỷ đơn hàng</option>
                          </select>
                        </div>
                      )}

                      {status === "đang giao hàng" && (
                        <div className="status in-transit">
                          <select
                            name="status"
                            className="shipping"
                            value={pendingStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value="shipping">Đang giao hàng</option>
                            <option value="order">Chờ xác nhận</option>
                            <option value="confirm">Đã xác nhận</option>
                            <option value="success">Đã giao hàng</option>
                            <option value="cancel">Huỷ đơn hàng</option>
                          </select>
                        </div>
                      )}

                      {status === "đã giao hàng" && (
                        <div className="status complete">
                          <select
                            name="status"
                            className="success"
                            value={pendingStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value="success">Đã giao hàng</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="order">Chờ xác nhận</option>
                            <option value="confirm">Đã xác nhận</option>
                            <option value="cancel">Huỷ đơn hàng</option>
                          </select>
                        </div>
                      )}

                      {status === "huỷ đơn hàng" && (
                        <div className="status rejected">
                          <select
                            name="status"
                            className="cancel"
                            value={pendingStatus}
                            onChange={handleStatusSelect}
                          >
                            <option value="cancel">Huỷ đơn hàng</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="success">Đã giao hàng</option>
                            <option value="order">Chờ xác nhận</option>
                            <option value="confirm">Đã xác nhận</option>
                          </select>
                        </div>
                      )}

                      <button type="submit">
                        <i className="bi bi-check2"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="list-order-pending">
                <div className="title-list-order-pending">
                  <p>Tên sản phẩm</p>
                  <p>Giá tiền</p>
                  <p>Kích cỡ</p>
                  <p>Số lượng</p>
                  <p>Tổng tiền</p>
                </div>

                <div className="main-list">
                  {productDetails.map((product, index) => (
                    <div className="main-order-pending" key={index}>
                      <div className="product-order-detail">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${product.img_pro}`} // Cập nhật đường dẫn ảnh
                          alt={product.name_pro}
                        />
                        <div className="content-product-order-detail">
                          <p>Tên sản phẩm: {product.name_pro}</p>
                          <p>
                            Toppings:{" "}
                            {product.toppings.length > 0
                              ? product.toppings.join(", ")
                              : "Không có"}
                          </p>
                        </div>
                      </div>
                      <p className="pending-total-money">
                        {product.price_pro.toLocaleString()}đ
                      </p>
                      <p>{product.size}</p>
                      <p>{product.quantity}</p>
                      <p className="order-detail-total-money">
                        {(
                          product.price_pro * product.quantity
                        ).toLocaleString()}
                        đ
                      </p>
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
}

export default OrderDetailAdmin;
