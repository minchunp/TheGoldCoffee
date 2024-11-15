"use client";
import "../../../../public/css/payment.css";
import "../../../../public/css/login_register.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartProducts, selectCartTotal } from "@/app/redux/cartSelector";
import { clearAllCart } from "@/app/redux/cartSlice";
import { useRouter } from "next/navigation";
import jwt_decode from "jsonwebtoken";
import axios from "axios";

const Payment = () => {
  const [hydrated, setHydrated] = useState(false);
  const [userData, setUserData] = useState({
    name_user: "",
    phoneNumber_user: "",
    address_user: "",
    note_order: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán (Tiền mặt hoặc ZaloPay)
  const cartProducts = useSelector(selectCartProducts);
  const totalPriceCart = useSelector(selectCartTotal);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setHydrated(true);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: any = jwt_decode.decode(token);
        const userId = decoded.id;

        const response = await axios.get(
          `http://localhost:3001/usersAPI/detailUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        setUserData({
          name_user: user.name_user || "Vui lòng cập nhật thông tin",
          phoneNumber_user:
            user.phoneNumber_user || "Vui lòng cập nhật thông tin",
          address_user: user.address_user || "Vui lòng cập nhật thông tin",
          note_order: "",
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng: ", error);
    }
  };

  const confirmPaymentAndSaveOrder = async (
    orderId: string,
    orderData: any
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cartsAPI/detailOrder/paymentCallback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        console.log("Đơn hàng đã được lưu thành công sau thanh toán");
        dispatch(clearAllCart());
        localStorage.removeItem("tempOrder");
        alert("Thanh toán thành công!");
        router.push("/");
      } else {
        console.error("Có lỗi khi lưu đơn hàng vào DB");
      }
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng vào DB:", error);
    }
  };
  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Lấy các tham số từ URL bằng router.query
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get("apptransid");
      const status = urlParams.get("status");

      if (orderId && status === "1") {
        console.log("Thanh toán thành công, đang xử lý đơn hàng...");

        // Nếu thanh toán thành công, lấy đơn hàng từ localStorage
        const tempOrder = localStorage.getItem("tempOrder");
        if (tempOrder) {
          const orderData = JSON.parse(tempOrder);

          try {
            // Gọi hàm để lưu đơn hàng vào cơ sở dữ liệu
            await confirmPaymentAndSaveOrder(orderId, orderData);

            // Thông báo thành công và dọn dẹp dữ liệu
            alert("Thanh toán thành công!");
            dispatch(clearAllCart());
            localStorage.removeItem("tempOrder");
            router.push("/"); // Chuyển hướng về trang chủ
          } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
            alert("Có lỗi khi xác nhận thanh toán. Vui lòng thử lại.");
          }
        }
      } else if (status === "0") {
        alert("Thanh toán thất bại hoặc bị hủy.");
      }
    };

    checkPaymentStatus();
  }, [dispatch, router]);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  const handleOrderSubmit = async () => {
    const token = localStorage.getItem("token");
    let userId = null;

    if (token) {
      const decoded: any = jwt_decode.decode(token);
      userId = decoded.id;
    }

    const shippingFee = 15000;
    const discount = 20000;
    const totalPayment = totalPriceCart + shippingFee - discount;

    const orderData = {
      id_user: userId,
      id_promotion: null,
      total_order: totalPayment,
      name_user: userData.name_user,
      phoneNumber_user: userData.phoneNumber_user,
      address_user: userData.address_user,
      note_order: userData.note_order,
      date_order: new Date().toISOString(),
      status_order: "chờ xác nhận",
      products: cartProducts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity_pro,
        price: item.price_pro,
        size: item.size_pro,
        toppings: item.toppings,
      })),
    };

    try {
      if (paymentMethod === "zalopay") {
        // Lưu đơn hàng tạm thời
        localStorage.setItem("tempOrder", JSON.stringify(orderData));

        const response = await fetch(
          "http://localhost:3001/cartsAPI/order/zalopay",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          }
        );

        if (response.ok) {
          const orderResponse = await response.json();
          localStorage.setItem("app_trans_id", orderResponse.app_trans_id);
          window.location.href = orderResponse.paymentUrl; // Chuyển hướng đến ZaloPay
        } else {
          console.error("Lỗi khi tạo đơn hàng ZaloPay");
          alert("Lỗi khi tạo đơn hàng ZaloPay. Vui lòng thử lại.");
        }
      } else if (paymentMethod === "cash") {
        // Xử lý thanh toán tiền mặt
        const response = await fetch(
          "http://localhost:3001/cartsAPI/order/cash",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          }
        );

        if (response.ok) {
          alert("Đặt hàng thành công!");
          dispatch(clearAllCart());
          router.push("/");
        } else {
          console.error("Lỗi khi tạo đơn hàng tiền mặt");
        }
      }
    } catch (error) {
      console.error("Lỗi kết nối đến API:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <>
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / Thanh toán</p>
        </div>
      </section>

      <main className="body-payment">
        <div className="boxcenter-payment">
          <div className="container-payment">
            <div className="info-payment">
              <div className="confirm-info">
                <h2>Xác nhận thanh toán</h2>
                <div className="input-payment">
                  <p>Địa chỉ cửa hàng</p>
                  <select name="" id="">
                    <option value="">
                      QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí
                      Minh
                    </option>
                    <option value="">
                      57, Đ. Phan Huy Ích, Quận Gò Vấp, Hồ Chí Minh
                    </option>
                    <option value="">
                      123, Đ. Phan Văn Trị, Quận Gò Vấp, Hồ Chí Minh
                    </option>
                  </select>
                </div>

                <div className="input-payment">
                  <p>Tên người nhận</p>
                  <input
                    type="text"
                    placeholder="Tên người nhận"
                    value={userData.name_user}
                    onChange={(e) =>
                      setUserData({ ...userData, name_user: e.target.value })
                    }
                  />
                </div>

                <div className="input-payment">
                  <p>Số điện thoại</p>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={userData.phoneNumber_user}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phoneNumber_user: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-payment">
                  <p>Địa chỉ</p>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={userData.address_user}
                    onChange={(e) =>
                      setUserData({ ...userData, address_user: e.target.value })
                    }
                  />
                </div>

                <div className="input-payment">
                  <p>Ghi chú</p>
                  <input
                    type="text"
                    placeholder="Ghi chú"
                    value={userData.note_order}
                    onChange={(e) =>
                      setUserData({ ...userData, note_order: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="method-payment">
                <h2>Phương thức thanh toán</h2>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Tiền mặt
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="zalopay"
                    checked={paymentMethod === "zalopay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Ví <img src="images/logo-zalopay.svg" alt="" />
                </label>
              </div>

              <button
                className="main-btn main-btn__payment"
                onClick={handleOrderSubmit}>
                Đặt hàng
              </button>
            </div>

            <div className="products-payment">
              <div className="main-products-payment">
                <div className="title-products-payment">
                  <h2>Các món đã chọn</h2>
                </div>

                <div className="container-products-payment">
                  {cartProducts.map((item) => (
                    <div key={item.productId} className="product-payment">
                      <div className="infor-product-payment">
                        <p className="name-pro-payment">
                          x<span>{item.quantity_pro}</span> {item.name_pro}
                        </p>
                        <p className="content-pro-payment">
                          Kích cỡ: {item.size_pro}
                        </p>
                        <p className="content-pro-payment">
                          Toppings:{" "}
                          {item.toppings
                            ? item.toppings.join(", ")
                            : "Không có"}
                        </p>
                      </div>
                      <p className="total-price-pro-payment">
                        {item.sale_pro !== 0
                          ? (item.sale_pro * item.quantity_pro).toLocaleString()
                          : (
                              item.price_pro * item.quantity_pro
                            ).toLocaleString()}
                        đ
                      </p>
                    </div>
                  ))}
                </div>

                <div className="main-total-products-payment">
                  <h2>Tổng cộng</h2>
                  <div className="container-total-products-payment">
                    <div className="result-subtotal result-subtotal__0">
                      <p className="title-subtotal">Tạm tính</p>
                      <p className="price-subtotal">
                        {totalPriceCart.toLocaleString()}đ
                      </p>
                    </div>
                    <div className="result-subtotal result-subtotal__0">
                      <p className="title-subtotal">Mã khuyến mãi</p>
                      <p className="price-subtotal">-20,000đ</p>
                    </div>
                    <div className="result-subtotal result-subtotal__0">
                      <p className="title-subtotal">Phí vận chuyển</p>
                      <p className="price-subtotal">+15,000đ</p>
                    </div>
                    <div className="result-subtotal result-subtotal__1">
                      <p className="title-subtotal">Tổng thanh toán</p>
                      <p className="price-subtotal">
                        {(totalPriceCart + 15000 - 20000).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Payment;
