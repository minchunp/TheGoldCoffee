"use client";
import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jsonwebtoken";

// Interface user
interface UserInterface {
   _id: string;
   name_user: string;
   email_user: string;
   phoneNumber_user: string;
   pass_user: string;
   address_user: string;
   role_user: string;
   status_user: number;
}

function EditUser({ params }: { params: { id: string } }) {
   console.log(params.id);
   const [user, setUser] = useState<UserInterface>({
      _id: "",
      name_user: "",
      email_user: "",
      phoneNumber_user: "",
      pass_user: "",
      address_user: "",
      role_user: "",
      status_user: 0,
   });

   useEffect(() => {
      if (params.id) {
         fetchUsers(params.id as string);
      }
   }, [params.id]);

   const fetchUsers = async (userId: string) => {
      try {
         const token = localStorage.getItem("token"); // Lấy token từ localStorage
         if (token) {
            const decoded: any = jwt_decode.decode(token); // Giải mã token
            // const userId = decoded.id; // Lấy ID từ token
  
            // Gửi yêu cầu GET lên API để lấy thông tin người dùng
            const response = await axios.get(
              `http://localhost:3001/usersAPI/detailUser/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
                },
              }
            );
            const dataUser = response.data;
            setUser(dataUser);
         }
         // const respone = await axios.get(`http://localhost:3001/usersAPI/detailUser/${userId}`);
         
      } catch (e) {
         console.log("Lỗi khi lấy thông tin khách hàng", e);
      }
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
         // Gọi API cập nhật thông tin user
         await fetch(`http://localhost:3001/user/update/${user._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         });

         console.log("Cập nhật thông tin khách hàng thành công!");
         window.location.href = "/admin/users";
      } catch (e) {
         console.log("Lỗi khi cập nhật thông tin khách hàng", e);
      }
   };

   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Sửa tài khoản khách hàng</h1>
                     <Link href="/admin/users">
                        <i className="bi bi-arrow-left-short"></i>
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
                        <h1>ID #{(user._id).slice(-4)}</h1>
                     </div>

                     <div id="list-user" className="list-order-pending">
                        <div className="title-list-order-pending">
                           <p>ID</p>
                           <p>Tên khách hàng</p>
                           <p>Email khách hàng</p>
                           <p>Vai trò</p>
                           <p>Chức năng</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                           <div className="main-list">
                              <div className="main-order-pending">
                                 <a href="#">
                                    <p>{(user._id).slice(-4)}</p>
                                 </a>
                                 <input
                                    className="name_user"
                                    type="text"
                                    name="name_user"
                                    placeholder="Tên khách hàng"
                                    value={user.name_user}
                                    onChange={(e) => setUser({ ...user, name_user: e.target.value })}
                                    required
                                 />
                                 <input
                                    className="email_user"
                                    type="text"
                                    name="email_user"
                                    placeholder="Email khách hàng"
                                    value={user.email_user}
                                    onChange={(e) => setUser({ ...user, email_user: e.target.value })}
                                    required
                                 />
                                 <select name="role_user" value={user.role_user} onChange={(e) => setUser({ ...user, role_user: e.target.value })}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                 </select>
                                 <button type="submit">
                                    <i className="bi bi-check2"></i>
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default EditUser;
