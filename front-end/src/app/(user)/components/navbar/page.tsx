"use client";
import Link from "next/link";
import "../../../../../public/css/navbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContex } from "@/app/context/cartContext";
import jwt from "jsonwebtoken"; // Import thư viện jsonwebtoken để giải mã token
import logoWebsiteURL from "../../../../../public/images/The Gold Coffee Logo SVG.png";

import { useSelector } from "react-redux";
import { selectCartProducts } from "@/app/redux/cartSelector";
import { useRouter } from "next/navigation";

// Kiểu dữ liệu người dùng
interface User {
  name_user: string;
  role_user: string;
  avatar?: string;
}

export default function Navbar() {
  // Sử dụng Redux
  const cartProducts = useSelector(selectCartProducts);

  const [user, setUser] = useState<User | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const sticky = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Sử dụng Context cho giỏ hàng
  // const context = useContext(CartContex);
  // if (!context) {
  //    throw new Error("Trang giỏ hàng phải được sử dụng trong CartProvider!");
  // }
  // const { items, removeItem, clearItem } = context;

  // Lấy token từ localStorage và giải mã token để lấy thông tin người dùng
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = jwt.decode(token); // Giải mã token để lấy thông tin người dùng
          setUser({
            name_user: decoded.name_user,
            role_user: decoded.role_user,
            avatar: decoded.avatar || "images/avatarAccountUser.jpg", // Đặt ảnh đại diện mặc định nếu không có
          });
          console.log(decoded);
        } catch (error) {
          console.error("Lỗi khi giải mã token:", error);
          setUser(null);
        }
      }
    }
  }, []);

  // Thêm hiệu ứng sticky cho navbar khi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sticky.current) {
        const offset = sticky.current.getBoundingClientRect().top;
        if (window.scrollY - offset > 46) {
          setIsSticky(true);
        } else if (window.scrollY - offset == 46) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const url = `/menu?search=${encodeURIComponent(searchTerm)}`;
      router.push(url); // Điều hướng đến trang menu
      setSearchTerm("");
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div
          ref={sticky}
          className={`main-top-nav ${isSticky ? "sticky" : ""}`}>
          <div className="boxcenter">
            <div className="top-nav">
              <div className="container-top-nav">
                <div className="item-top-nav">
                  <i className="bi bi-check2"></i>
                  <p>
                    <span>
                      <a href="#!">123 cửa hàng</a>
                    </span>{" "}
                    trên khắp cả nước
                  </p>
                </div>
                <div className="item-top-nav">
                  <i className="bi bi-check2"></i>
                  <p>
                    <span>Liên hệ đặt hàng tại:</span> 0123 456 789
                  </p>
                </div>
                <div className="item-top-nav">
                  <i className="bi bi-check2"></i>
                  <p>
                    <span>100% SẢN PHẨM</span> được kiểm định chất lượng
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom-nav">
              <div className="container-bottom-nav">
                <div className="main-logo-website">
                  <Link href="/">
                    <img src={logoWebsiteURL.src} alt="Logo Website" />
                  </Link>
                </div>

                <div className="right-func-bottom-nav">
                  <div className="input-search-nav">
                    <input
                      type="text"
                      placeholder="Bạn muốn tìm kiếm gì..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                    />
                    <i className="bi bi-search" onClick={handleSearch}></i>
                  </div>

                  <div className="func-user-nav">
                    {/* Hiển thị thông tin người dùng nếu đã đăng nhập */}
                    {user ? (
                      <div className="main-user">
                        <div className="func-account">
                          <i className="bi bi-person"></i>
                        </div>
                        <div className="modal-user-login">
                          <div className="func-main-modal">
                            <Link
                              data-tooltip="Thông tin"
                              href="/inforCustomer">
                              <i className="bi bi-info"></i>
                            </Link>
                            {user.role_user === "admin" && (
                              <Link data-tooltip="Trang admin" href="/admin">
                                <i className="bi bi-person-fill-gear"></i>
                              </Link>
                            )}
                            {/* Nút Đăng xuất */}
                            <a
                              data-tooltip="Đăng xuất"
                              onClick={() => {
                                localStorage.removeItem("token"); // Xóa token khỏi localStorage
                                window.location.href = "/login"; // Điều hướng về trang login
                              }}>
                              <i className="bi bi-box-arrow-left"></i>
                            </a>
                          </div>

                          {/* Hiển thị thông tin người dùng */}
                          <div className="main-modal">
                            <div className="image-user">
                              <img src={user.avatar} alt="User Avatar" />
                            </div>
                            <div className="name-user">
                              <a href="#">
                                <h3>{user.name_user}</h3>
                              </a>
                              <p>{user.role_user}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Nếu chưa đăng nhập
                      <Link className="func-account" href="/login">
                        <i className="bi bi-person"></i>
                      </Link>
                    )}

                    <Link className="func-cart" href="/cart">
                      <div id="cart-count">{cartProducts.length}</div>
                      <i className="bi bi-bag"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main menu */}
        <div className="main-menu">
          <div className="boxcenter">
            <div className="container-main-menu">
              <Link href="/menu">
                <div className="main-browse-cate">
                  <i className="bi bi-list"></i>
                  <p>Menu sản phẩm</p>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </Link>
              <div className="menu">
                <div className="item-menu">
                  <a href="#!">Trang chủ</a>
                </div>
                <div className="item-menu">
                  <a href="#!">Chuyện nhà</a>
                </div>
                <div className="item-menu">
                  <a href="#!">Cửa hàng</a>
                </div>
                <div className="item-menu">
                  <a href="#!">Khuyến mãi</a>
                </div>
                <div className="item-menu">
                  <a href="#!">Tuyển dụng</a>
                  {/* <Link href="/recruitment">Tuyển dụng</Link> */}
                </div>
                <div className="item-menu">
                  <a href="#!">Tin tức</a>
                  {/* <Link href="/new">Tin tức</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
