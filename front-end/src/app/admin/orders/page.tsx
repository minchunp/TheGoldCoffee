"use client"; // Thêm dòng này để biến component thành Client Component

import React, { useEffect, useState } from "react";
import "../../../../public/css/orderAdmin.css";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import Link from "next/link";

interface Order {
  id: string;
  name_user: string;
  address: string;
  total: number;
  date: string;
  status: string;
}

const OrderAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/cartsAPI/list_order"
        );
        const data = await response.json();
        // Sắp xếp đơn hàng theo ngày giảm dần
        const sortedOrders = data.sort((a: Order, b: Order) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section>
      <div className="main-dashboard">
        <div className="boxcenter">
          <div className="title-product">
            <h1>Order</h1>
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
              <h1>Danh sách đơn hàng</h1>
              <div className="filter-oder-pending">
                <select name="" id="">
                  <option value="">January</option>
                  <option value="">February</option>
                  <option value="">March</option>
                  <option value="">April</option>
                  <option value="">May</option>
                  <option value="">June</option>
                  <option value="">July</option>
                  <option value="">August</option>
                  <option value="">September</option>
                  <option value="">October</option>
                  <option value="">November</option>
                  <option value="">December</option>
                </select>
              </div>
            </div>

            <div className="list-order-pending">
              <div className="title-list-order-pending">
                <p>ID</p>
                <p>Tên khách hàng</p>
                <p>Địa chỉ</p>
                <p>Tổng tiền</p>
                <p>Ngày - Thời gian</p>
                <p>Trạng thái</p>
              </div>

              <div className="main-list">
                {orders.map((order) => (
                  <div className="main-order-pending" key={order.id}>
                    <Link href={`/admin/orderDetail/${order.id}`}>
                      <p>{order.id.slice(-5)}</p>{" "}
                      {/* Hiện 5 ký tự cuối của ID */}
                    </Link>
                    <p>{order.name_user}</p>
                    <p>{order.address}</p>
                    <p className="pending-total-money">
                      {order.total.toLocaleString()}đ
                    </p>
                    <p>{order.date}</p>
                    <div className="statusA">
                      <div
                        className={`status ${
                          order.status === "chờ xác nhận"
                            ? "pending"
                            : order.status === "đã xác nhận"
                            ? "confirm"
                            : order.status === "đang giao hàng"
                            ? "in-transit"
                            : order.status === "đã giao hàng"
                            ? "complete"
                            : "rejected"
                        }`}
                      >
                        <p>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </p>{" "}
                        {/* Chỉnh sửa status */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderAdmin;
