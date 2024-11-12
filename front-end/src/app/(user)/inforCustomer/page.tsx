"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jsonwebtoken"; // Thư viện để giải mã token
import "../../../../public/css/inforCustomer.css";
import "../../../../public/css/login_register.css";
import { useSelector } from "react-redux";
import { selectCartProducts } from "@/app/redux/cartSelector";
import ModalOrderDetail from "../components/modalOrderDetail/[id]/page";

interface Oder {
   id: string;
   id_user: string
   name_user: string;
   date: Date;
   status: string;
}
const InforCustomer = () => {
   const [isModalOpenOrderDetail, setIsModalOpenOrderDetail] = useState(false);
   const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string>('');
   const [order, setOrder] = useState(true);
   const [showOder, setShowOder] = useState<Oder[]>([]);
   const [oderStatus, setOderStatus] = useState<string>('chờ xác nhận');
   const [filterOder, setFilterOder] = useState<Oder[]>([]);
   const [confirm, setConfirm] = useState(false);
   const [inTransit, setInTransit] = useState(false);
   const [complete, setComplete] = useState(false);
   const [rejected, setRejected] = useState(false);
   const [userData, setUserData] = useState({
      name_user: "Vui lòng cập nhật thông tin",
      phoneNumber_user: "Vui lòng cập nhật thông tin",
      address_user: "Vui lòng cập nhật thông tin",
   });
   const [loading, setLoading] = useState(true);
   const [orderCount, setOrdercount] = useState({
      order: 0,
      confirm: 0,
      transit: 0,
      complete: 0,
      rejected: 0
   })

   // Sử dụng Redux
   const cartProduct = useSelector(selectCartProducts);

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
            if (token) {
               const decoded: any = jwt_decode.decode(token); // Giải mã token
               const userId = decoded.id; // Lấy ID từ token

               // Gửi yêu cầu GET lên API để lấy thông tin người dùng
               const response = await axios.get(`http://localhost:3001/usersAPI/detailUser/${userId}`, {
                  headers: {
                     Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
                  },
               });

               // Gửi yêu cầu GET lên API để lấy thông tin Order
               const orderResponse = await axios.get(`http://localhost:3001/cartsAPI/list_order `, {
                  headers: {
                     Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
                  },
               })
               // 
               const UoderResponse = orderResponse.data.filter((Uorder : Oder) => Uorder.id_user === userId)
               setShowOder(UoderResponse);
               setFilterOder(UoderResponse);
               const user = response.data; // Lưu thông tin người dùng
               // console.log("Thông tin người dùng: ", user);
               // Cập nhật state với thông tin người dùng hoặc giá trị mặc định nếu rỗng
               setUserData({
                  name_user: user.name_user || "Vui lòng cập nhật thông tin",
                  phoneNumber_user: user.phoneNumber_user || "Vui lòng cập nhật thông tin",
                  address_user: user.address_user || "Vui lòng cập nhật thông tin",
               });
            }
         } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng: ", error);
         } finally {
            setLoading(false); // Kết thúc quá trình tải
         }
      };

      fetchUserData(); // Gọi hàm lấy thông tin người dùng
   }, []);

   // set default tại OpenOder
   useEffect(() => {
      if (showOder.length > 0) {
         filterOderByStatus("chờ xác nhận");
         openOrder();
      }
   }, [showOder]);

   

   // count order
   useEffect(() => {
      const calculateOrderCounts = () => {
         const counts = {
            order: showOder.filter((order) => order.status === "chờ xác nhận").length,
            confirm: showOder.filter((order) => order.status === "đã xác nhận").length,
            transit: showOder.filter((order) => order.status === "đang giao hàng").length,
            complete: showOder.filter((order) => order.status === "đã giao hàng").length,
            rejected: showOder.filter((order) => order.status === "hủy đơn hàng").length
         };
         setOrdercount(counts);
      };
      calculateOrderCounts();
   }, [showOder]);

   if (loading) {
      return <h2>Đang tải dữ liệu...</h2>; // Hiển thị khi dữ liệu đang được tải
   }

   // Xử lý sự kiện click vào từng trạng thái đơn hàng
   const openOrder = () => {
      setOrder(true);
      setConfirm(false);
      setInTransit(false);
      setComplete(false);
      setRejected(false);
   };

   const openConfirm = () => {
      setOrder(false);
      setConfirm(true);
      setInTransit(false);
      setComplete(false);
      setRejected(false);
   };

   const openInTransit = () => {
      setOrder(false);
      setConfirm(false);
      setInTransit(true);
      setComplete(false);
      setRejected(false);
   };

   const openComplete = () => {
      setOrder(false);
      setConfirm(false);
      setInTransit(false);
      setComplete(true);
      setRejected(false);
   };

   const openRejected = () => {
      setOrder(false);
      setConfirm(false);
      setInTransit(false);
      setComplete(false);
      setRejected(true);
   };

   // xử lý show theo trừng trạng thái
   const filterOderByStatus = (status:string) => {
      setOderStatus(status);
      const filtered = showOder.filter((order) => order.status === status);
      setFilterOder(filtered);
   }
  //  Xử lý sự kiện click xem chi tiết đơn hàng
   const openModal = (id: string) => {
      setIsModalOpenOrderDetail(true);
      setSelectedOrderDetailId(id);
   }
   const closeModal = () => setIsModalOpenOrderDetail(false);
   
   // 
   console.log(showOder);

   return (
      <>
         <ModalOrderDetail id={selectedOrderDetailId} isOpen={isModalOpenOrderDetail} onClose={closeModal} />
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Thông tin khách hàng</p>
            </div>
         </section>

         {/* Main body information customer */}
         <main className="body-inforCustomer">
            <div className="boxcenter">
               <div className="title-inforCustomer">
                  <h1>{userData.name_user}</h1>
               </div>

               <div className="main-inforCustomer">
                  <div className="container-main-inforCustomer">
                     <div className="myAccount">
                        <h2>Tài khoản của tôi</h2>

                        <div className="content-inforCustomer">
                           <a href="#!">Chỉnh sửa thông tin</a>
                           <a href="/cart">Giỏ hàng ({cartProduct.length})</a>
                           <a
                              href="#!"
                              onClick={() => {
                                 localStorage.removeItem("token"); // Xóa token khi đăng xuất
                                 window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
                              }}
                           >
                              Đăng xuất
                           </a>
                        </div>
                     </div>

                     <div className="information">
                        <h2>Thông tin chi tiết</h2>

                        <div className="content-inforCustomer">
                           <p>Tên tài khoản: {userData.name_user}</p>
                           <p>Số điện thoại: {userData.phoneNumber_user}</p>
                           <p>Địa chỉ: {userData.address_user}</p>
                        </div>
                        </div>
                  </div>
               </div>

               <div className="order-information">
                  <div className="main-icon-order-information">
                     <div onClick={() => { filterOderByStatus("chờ xác nhận"); openOrder()}} className={`icon-order-information ${order ? "check" : ""}`} >
                        <div className="quantity-order-information">{orderCount.order}</div>
                        <i className="bi bi-hourglass-top"></i>
                     </div>
                     <div onClick={() => { filterOderByStatus("đã xác nhận"); openConfirm()}} className={`icon-order-information ${confirm ? "check" : ""}`}>
                        <div className="quantity-order-information">{orderCount.confirm}</div>
                        <i className="bi bi-box"></i>
                     </div>
                     <div onClick={() => { filterOderByStatus("đang giao hàng"); openInTransit()}} className={`icon-order-information ${inTransit ? "check" : ""}`}>
                        <div className="quantity-order-information">{orderCount.transit}</div>
                        <i className="bi bi-truck"></i>
                     </div>
                     <div onClick={() => { filterOderByStatus("đã giao hàng"); openComplete()}} className={`icon-order-information ${complete ? "check" : ""}`}>
                        <div className="quantity-order-information">{orderCount.complete}</div>
                        <i className="bi bi-check2-circle"></i>
                     </div>
                     <div onClick={() => { filterOderByStatus("hủy đơn hàng"); openRejected()}} className={`icon-order-information ${rejected ? "check" : ""}`}>
                        <div className="quantity-order-information">{orderCount.rejected}</div>
                        <i className="bi bi-x-octagon"></i>
                     </div>
                  </div>

                  <div className="body-order-information">
                     <div className="title-body-order-information">
                        <h2>Mã đơn hàng</h2>
                        <h2>Tên khách hàng</h2>
                        <h2>Thời gian - Ngày đặt hàng</h2>
                        <h2>Trạng thái đơn hàng</h2>
                        <h2>Chức năng</h2>
                     </div>
                     <div className="content-body-order-information">
                        {/* filterOder.map */}
                        {
                           filterOder.length > 0 
                           ?
                           (filterOder.map((order) => (
                              <div key={order.id} className="item-order-information">
                                 <p>{order.id.slice(-4)}</p>
                                 <p>{order.name_user}</p>
                                 <p>{order.date.toLocaleString()}</p>
                                 <p>{(order.status).charAt(0).toUpperCase()+(order.status).slice(1)}</p>
                                 <p onClick={() => openModal(order.id)} className="btn-check-orderDetail">Xem chi tiết</p>
                              </div>
                           ))
                        ):(<div className="empty-item-order-information">Không có đơn hàng!</div>) 
                        }
                        </div>
                     </div>
                  </div>
               </div>
         </main>
         </>
      );
   };

export default InforCustomer;