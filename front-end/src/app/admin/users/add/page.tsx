"use client";
import Link from "next/link";
import "../../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../../public/images/wallpaper-angledwares.jpg";
import React, { useState } from "react";
import axios from "axios";

// Interface user
interface UserInterface {
   name_user: string;
   email_user: string;
   phoneNumber_user: string;
   pass_user: string;
   address_user: string;
   role_user: string;
   status_user: number;
}

const AddUser: React.FC = () => {
   const [name_user, setNameUser] = useState("");
   const [email_user, setEmailUser] = useState("");
   const [phoneNumber_user, setPhoneNumberUser] = useState("Chưa cập nhật");
   const [pass_user, setPassUser] = useState("123");
   const [address_user, setAddressUser] = useState("Chưa cập nhật");
   const [role_user, setRoleUser] = useState("user");
   const [status_user, setStatusUser] = useState(1);

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      // Tạo đối tượng User từ state
      const newUser: UserInterface = {
         name_user: name_user,
         email_user: email_user,
         phoneNumber_user: phoneNumber_user,
         pass_user: pass_user,
         address_user: address_user,
         role_user: role_user,
         status_user: status_user,
      };

      try {
         // const respone = await axios.post("http://localhost:3000/users", newUser);
         const respone = await axios.post("http://localhost:3001/user/add", newUser, {
            headers: {
               "Content-Type": "application/json",
            },
         });
         const dataUser = await respone.data;
         console.log("Thêm khách hàng thành công!", dataUser);
         // Xoá dữ liệu form sau khi thêm user thành công
         setNameUser("");
         setEmailUser("");
         setPhoneNumberUser("");
         setPassUser("");
         setAddressUser("");
         setRoleUser("user");
         setStatusUser(1);
         window.location.href = "/admin/users";
      } catch (e) {
         console.log("Thêm khách hàng thất bại!", e);
      }
   };

   return (
      <>
         <section>
            <div className="main-dashboard">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Thêm tài khoản khách hàng</h1>
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
                        <h1>ID Khách hàng #Random</h1>
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
                                    <p>Random</p>
                                 </a>
                                 <input
                                    className="name_user"
                                    type="text"
                                    name="name_user"
                                    placeholder="Tên khách hàng"
                                    value={name_user}
                                    onChange={(e) => setNameUser(e.target.value)}
                                    required
                                 />
                                 <input
                                    className="email_user"
                                    type="text"
                                    name="email_user"
                                    placeholder="Email khách hàng"
                                    value={email_user}
                                    onChange={(e) => setEmailUser(e.target.value)}
                                    required
                                 />
                                 <select name="role_user" value={role_user} onChange={(e) => setRoleUser(e.target.value)}>
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
};

export default AddUser;
