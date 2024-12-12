// layout.tsx (Client Component)
"use client"; // Đánh dấu là Client Component
import { metadata } from "../redux/metadata"; // Import metadata từ file metadata.ts
import Link from "next/link";
import "../../../public/css/mainAdmin.css";
import logoWebAdmin from "../../../public/images/The Gold Coffee Logo SVG.png";
import avtAccountAdmin from "../../../public/images/avatarAccountAdmin.jpeg";
import VietNam from "../../../public/images/VietNam.webp";
import LeftNav from "./components/leftNav";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import thư viện axios để gọi API
import jwt from "jsonwebtoken"; // Import thư viện jsonwebtoken

// Kiểu dữ liệu người dùng
interface User {
  name_user: string;
  role_user: string;
  avatar?: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sử dụng Redux
  const [user, setUser] = useState<User | null>(null);

  // Lấy token từ localStorage và gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded: any = jwt.decode(token); // Giải mã token để lấy ID
            const userId = decoded.id; // Lấy ID từ token

            // Gửi yêu cầu GET lên API để lấy thông tin người dùng
            const response = await axios.get(
              `http://localhost:3001/usersAPI/detailUser/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
                },
              }
            );

            // Kiểm tra và cập nhật thông tin người dùng
            if (response.data) {
              setUser(response.data);
            } else {
              // Xóa token khỏi localStorage nếu không có data trả về (token hết hạn)
              localStorage.removeItem("token");
              setUser(null);
            }
          } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            localStorage.removeItem("token"); // Xóa token nếu có lỗi (có thể do token không hợp lệ hoặc hết hạn)
            setUser(null);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="main-container">
          {/* Main menu */}
          <LeftNav />
          {/* Main content */}
          <div className="main">
            {/* Header website Hurst */}
            <header className="main-header-admin">
              <div className="boxcenter">
                <div className="container-header">
                  <div className="input-search">
                    <input type="text" placeholder="Tìm kiếm" />
                    <i className="bi bi-search"></i>
                  </div>

                  <div className="account">
                    <div className="notification">
                      <i className="bi bi-bell-fill"></i>
                      <div className="count-notification">1</div>
                    </div>

                    <div className="language">
                      <img src={VietNam.src} alt="" />
                      <div className="content-language">
                        <p>Việt Nam</p>
                        <i className="bi bi-chevron-compact-down"></i>
                      </div>
                    </div>

                    <div className="information-user">
                      <div className="image-user">
                        <a href="/Template/Html/index.html">
                          <img src={avtAccountAdmin.src} alt="" />
                        </a>
                      </div>
                      <div className="name-user">
                        <p>{user?.name_user || "none"}</p>
                        <p className="position">{user?.role_user || "none"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Content admin */}
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
