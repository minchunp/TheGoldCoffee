"use client";
import Link from "next/link";
import "../../../../public/css/dashboardAdmin.css";
import BannerSectionAdmin from "../../../../public/images/wallpaper-angledwares.jpg";
import UserListAdmin from "./listUser";
import jwt_decode from "jsonwebtoken"; // Thư viện để giải mã token

import { fetchUsers } from "@/app/api";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

const UserAdmin = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  console.log(users);

  useEffect(() => {
    // const token = localStorage.getItem("token"); // Lấy token từ localStorage
    // const decoded: any = jwt_decode.decode(token); // Giải mã token
    //             const userId = decoded.id; // Lấy ID từ token
    //  // Gọi API để lấy danh sách sản phẩm
    //  axios
    //    .get<UserInterface[]>("http://localhost:3001/usersAPI/listUser", {
    //       headers: {
    //          Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
    //       })
    //    .then((response) => {
    //      setUsers(response.data);
    //    })
    //    .catch((error) => {
    //      console.error("Error fetching products:", error);
    //    });

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (token) {
          const decoded: any = jwt_decode.decode(token); // Giải mã token
          const userId = decoded.id; // Lấy ID từ token

          // Gửi yêu cầu GET lên API để lấy thông tin người dùng
          const response = await axios.get(
            `http://localhost:3001/usersAPI/listUser`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
              },
            }
          );

          console.log(response.data);

          setUsers(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng: ", error);
      } finally {
      }
    };

    fetchUserData(); // Gọi hàm lấy thông tin người dùng
  }, []);

  // // Fetch API Users
  // const fetcher = (url: string) => fetchUsers();
  // const {data, error} = useSWR<UserInterface[]>('listUser', fetcher);
  // if (error) return <strong>Có lỗi xảy ra!</strong>
  // if (!data) return <strong>Đang tải dữ liệu...</strong>

  return (
    <>
      <section>
        <div className="main-dashboard">
          <div className="boxcenter">
            <div className="title-product">
              <h1>Khách hàng</h1>
              <Link href="/admin/users/add">
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
                <h1>Danh sách khách hàng</h1>
              </div>

              <div id="list-user" className="list-order-pending">
                <div className="title-list-order-pending">
                  <p>ID</p>
                  <p>Tên khách hàng</p>
                  <p>Email khách hàng</p>
                  <p>Vai trò khách hàng</p>
                  <p>Chức năng</p>
                </div>

                <UserListAdmin users={users} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAdmin;
