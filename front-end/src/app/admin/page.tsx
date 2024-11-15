"use client";
import React, { useEffect, useState } from "react";
import "../../../public/css/dashboardAdmin.css";

interface Order {
  id: string;
  name_user: string;
  address: string;
  total: number;
  date: string;
  status: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/cartsAPI/list_order"
        );
        const data: Order[] = await response.json();
        setOrders(data);

        // Tính tổng số khách hàng duy nhất
        const uniqueCustomers = new Set(data.map((order) => order.name_user));
        setTotalCustomers(uniqueCustomers.size);

        // Tổng số hóa đơn
        setTotalOrders(data.length);

        // Đếm số đơn hàng chờ xác nhận
        setPendingCount(
          data.filter((order) => order.status === "chờ xác nhận").length
        );

        // Tổng tiền bán được cho các đơn hàng "Đã giao hàng"
        const salesSum = data
          .filter((order) => order.status === "Đã giao hàng")
          .reduce((sum, order) => sum + order.total, 0);
        setTotalSales(salesSum);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <section>
        <div className="main-dashboard">
          <div className="boxcenter">
            <div className="title-product">
              <h1>Dashboard</h1>
            </div>

            <div className="container-box-infor-dashboard">
              <div className="infor-dashboard">
                <div className="top-infor-dashboard">
                  <div className="title-infor-dasboard">
                    <p>Tổng khách hàng</p>
                    <h3>{totalCustomers}</h3>
                  </div>
                  <div className="icon-infor-dashboard_1">
                    <i className="bi bi-people-fill"></i>
                  </div>
                </div>
                <div className="content-infor-dashboard">
                  {/* <i className="bi bi-graph-up-arrow up"></i> */}
                  <p>
                    {/* <span className="up">Tăng 8.3%</span> so với tuần trước */}
                  </p>
                </div>
              </div>

              <div className="infor-dashboard">
                <div className="top-infor-dashboard">
                  <div className="title-infor-dasboard">
                    <p>Tổng hoá đơn</p>
                    <h3>{totalOrders}</h3>
                  </div>
                  <div className="icon-infor-dashboard_2">
                    <i className="bi bi-box"></i>
                  </div>
                </div>
                <div className="content-infor-dashboard">
                  {/* <i className="bi bi-graph-up-arrow up"></i> */}
                  <p>
                    {/* <span className="up">Tăng 1.3%</span> so với tuần trước */}
                  </p>
                </div>
              </div>

              <div className="infor-dashboard">
                <div className="top-infor-dashboard">
                  <div className="title-infor-dasboard">
                    <p>Tổng tiền bán được</p>
                    <h3>{totalSales.toLocaleString()}đ</h3>
                  </div>
                  <div className="icon-infor-dashboard_3">
                    <i className="bi bi-graph-up"></i>
                  </div>
                </div>
                <div className="content-infor-dashboard">
                  {/* <i className="bi bi-graph-down-arrow down"></i> */}
                  <p>
                    {/* <span className="down">Giảm 4.5%</span> so với tuần trước */}
                  </p>
                </div>
              </div>

              <div className="infor-dashboard">
                <div className="top-infor-dashboard">
                  <div className="title-infor-dasboard">
                    <p>Tổng đơn hàng đợi</p>
                    <h3>{pendingCount}</h3>
                  </div>
                  <div className="icon-infor-dashboard_4">
                    <i className="bi bi-clock-history"></i>
                  </div>
                </div>
                <div className="content-infor-dashboard">
                  {/* <i className="bi bi-graph-up-arrow up"></i> */}
                  <p>
                    {/* <span className="up">Tăng 1.3%</span> so với tuần trước */}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-pending">
              <div className="title-order-pending">
                <h1>Đơn hàng đang đợi</h1>
              </div>

              <div className="list-order-pending">
                <div className="title-list-order-pending">
                  <p>Id</p>
                  <p>Tên khách hàng</p>
                  <p>Địa chỉ</p>
                  <p>Tổng tiền</p>
                  <p>Ngày - Thời gian</p>
                  <p>Trạng thái</p>
                </div>

                <div className="main-list">
                  {orders
                    .filter((order) => order.status === "chờ xác nhận")
                    .reverse() // Đảo ngược thứ tự mảng
                    .map((order) => (
                      <div className="main-order-pending" key={order.id}>
                        <a href={`/admin/orderDetail/${order.id}`}>
                          <p>{order.id.slice(-5)}</p>
                        </a>
                        <p>{order.name_user}</p>
                        <p>{order.address}</p>
                        <p className="pending-total-money">
                          {order.total.toLocaleString()}đ
                        </p>
                        <p>{order.date}</p>
                        <a className="statusA" href="">
                          <div className="status pending">
                            <p>Chờ xác nhận</p>
                          </div>
                        </a>
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

export default Dashboard;
