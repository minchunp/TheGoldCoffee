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

  // CALL API TỈNH, QUẬN HUYỆN, PHƯỜNG XÃ
  const [tinhs, setTinhs] = useState<any[]>([]);
  const [quanhuyens, setQuanHuyens] = useState<any[]>([]);
  const [phuongxas, setPhuongXas] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [idtinh, setIdTinh] = useState(79);
  const [idPhuongXa, setIdPhuongXa] = useState(999);

  const [discount, setDiscount] = useState(0);
  const [codeDiscount, setCodeDiscount] = useState("NONEKM");
  const [discountID, setDiscountID] = useState("");

  const [selectedTinh, setSelectedTinh] = useState<string | number>(""); // Tỉnh
  const [selectedTinhName, setSelectedTinhName] = useState<string>(""); // Phường xã
  const [selectedQuanHuyenName, setselectedQuanHuyenName] =
    useState<string>(""); // Phường xã
  const [selectedQuanHuyen, setSelectedQuanHuyen] = useState<string | number>(
    ""
  ); // Quận huyện
  const [selectedPhuongXa, setSelectedPhuongXa] = useState<string | number>(""); // Phường xã
  const [selectedPhuongXaName, setSelectedPhuongXaName] = useState<string>(""); // Phường xã
  const [errorMessage, setErrorMessage] = useState(""); // Lỗi validation
  //TỈNH THÀNH
  const fetchTinhs = async () => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/1/0.htm`
      );
      const dsTinh = response.data.data;
      setTinhs(dsTinh);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tỉnh thành: ", error);
    }
  };

  const handleTinh = (event: any) => {
    const selectedTinhId = event.target.value;
    // Lấy tên của tỉnh từ textContent của option đã chọn
    const selectedTinhName =
      event.target.options[event.target.selectedIndex].textContent;
    console.log(selectedTinhName);
    setIdTinh(selectedTinhId);
    setIdPhuongXa(999); // Reset phường xã khi đổi tỉnh
    setSelectedTinh(selectedTinhId);
    setErrorMessage(""); // Reset lỗi khi người dùng thay đổi lựa chọn
    setSelectedQuanHuyen(""); // Reset Quận huyện khi thay đổi tỉnh
    setSelectedPhuongXa(""); // Reset Phường xã khi thay đổi tỉnh
    fetchQuanHuyens(selectedTinhId);
    if (typeof selectedTinhName == "string") {
      setSelectedTinhName(selectedTinhName);
    }
  };

  //QUẬN HUYỆN
  const fetchQuanHuyens = async (selectedTinhId: number) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${selectedTinhId}.htm`
      );
      const dsQuanHuyen = response.data.data;
      setQuanHuyens(dsQuanHuyen);
      setPhuongXas([]); // Reset phường xã khi đổi quận huyện
    } catch (error) {
      console.error("Lỗi khi lấy thông tin quận huyện: ", error);
    }
  };

  const handleQuanHuyen = (event: any) => {
    const selectedQuanHuyenId = event.target.value;
    // Lấy tên của quận huyện từ textContent của option đã chọn
    const selectedQuanHuyenName =
      event.target.options[event.target.selectedIndex].textContent;
    console.log(selectedQuanHuyenName);
    setIdPhuongXa(999); // Reset phường xã khi đổi quận huyện
    setSelectedQuanHuyen(selectedQuanHuyenId);
    setErrorMessage(""); // Reset lỗi khi người dùng thay đổi lựa chọn
    setSelectedPhuongXa(""); // Reset Phường xã khi thay đổi Quận huyện
    fetchPhuongXas(selectedQuanHuyenId); // Gọi API lấy phường xã khi thay đổi quận huyện
    if (typeof selectedQuanHuyenName == "string") {
      setselectedQuanHuyenName(selectedQuanHuyenName);
    }
  };

  //PHƯỜNG XÃ
  const fetchPhuongXas = async (selectedQuanHuyenId: number) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${selectedQuanHuyenId}.htm`
      );
      if (response.data.data != null) {
        const dsPhuongXa = response.data.data;
        setPhuongXas(dsPhuongXa);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phường xã: ", error);
    }
  };

  // Handle chọn Phường xã
  const handlePhuongXa = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPhuongXaId = event.target.value;
    // Lấy tên của phường xã từ textContent của option đã chọn
    const selectedPhuongXaName =
      event.target.options[event.target.selectedIndex].textContent;
    console.log(selectedPhuongXaName);
    setSelectedPhuongXa(selectedPhuongXaId);
    if (typeof selectedPhuongXaName == "string") {
      setSelectedPhuongXaName(selectedPhuongXaName);
    }
  };

  // ........................................................
  //khuyến mãi

  //..........................................................

  const [userData, setUserData] = useState({
    name_user: "",
    phoneNumber_user: "",
    address_user: "",
    note_order: "",
  });
  const cartProducts = useSelector(selectCartProducts);
  const totalPriceCart = useSelector(selectCartTotal);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setHydrated(true);
    fetchUserData();
    fetchTinhs();
    // Lấy chuỗi JSON từ localStorage bằng khóa
    const jsonString = localStorage.getItem("myObjectKey");

    // Kiểm tra nếu có dữ liệu trong localStorage
    if (jsonString) {
      // Chuyển chuỗi JSON thành đối tượng JavaScript
      const myObject = JSON.parse(jsonString);
      setDiscount(myObject.value);
      setCodeDiscount(myObject.makm);
      setDiscountID(myObject.id);
      console.log(myObject);
      console.log(discount);
    } else {
      console.log("Không có dữ liệu trong localStorage với khóa này");
    }
    // fetchQuanHuyens();
    // fetchPhuongXas();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: any = jwt_decode.decode(token);
        const userId = decoded.id;
        setToken(token);

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

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  const handleOrderSubmit = async () => {
    const token = localStorage.getItem("token");

    var kq = await checkKM(codeDiscount);

    if (kq == 500) {
      setDiscount(0);
      setCodeDiscount("NONEKM");
      setDiscountID("67324e6c785de7124c3e1d6b");
      localStorage.removeItem("myObjectKey");
      setErrorMessage("khuyễn mãi hết hiệu lực.");
      return;
    }

    localStorage.removeItem("myObjectKey");
    let userId = null;

    if (token) {
      const decoded: any = jwt_decode.decode(token);
      userId = decoded.id;
    }

    if (!selectedTinh || !selectedQuanHuyen || !selectedPhuongXa) {
      setErrorMessage(
        "Vui lòng chọn đầy đủ thông tin: Tỉnh, Quận/Huyện và Phường/Xã."
      );
      alert("vui lòng điền đủ các thông tin");
      return;
    }

    // Tính toán tổng thanh toán
    // const shippingFee = 15000; // Phí vận chuyển

    const totalPayment = totalPriceCart - discount;

    const orderData = {
      id_user: userId,
      id_promotion: discountID || "none",
      total_order: totalPayment, // Sử dụng tổng thanh toán
      discount: discount || 0,
      name_user: userData.name_user,
      phoneNumber_user: userData.phoneNumber_user,
      address_user: `${selectedTinhName}, ${selectedQuanHuyenName}, ${selectedPhuongXaName}, ${userData.address_user}`,
      note_order: userData.note_order,
      date_order: new Date().toISOString(),
      rating_order: null,
      feedback_order: null,
      isFeedback_order: false,
      method_pay_type: "Tiền mặt",
      method_pay_status: "",
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
      const response = await fetch("http://localhost:3001/cartsAPI/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        dispatch(clearAllCart());
        router.push("/");
      } else {
        console.error("Có lỗi xảy ra khi tạo đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi kết nối đến API:", error);
    }
  };

  // THANH TOÁN ZALOPAY
  const handleOrderSubmitZaloPay = async () => {
    var kq = await checkKM(codeDiscount);

    if (kq == 500) {
      setDiscount(0);
      setCodeDiscount("NONEKM");
      setDiscountID("67324e6c785de7124c3e1d6b");
      localStorage.removeItem("myObjectKey");
      setErrorMessage("khuyễn mãi hết hiệu lực.");
      return;
    }

    const token = localStorage.getItem("token");
    localStorage.removeItem("myObjectKey");
    let userId = null;

    if (token) {
      const decoded: any = jwt_decode.decode(token);
      userId = decoded.id;
    }

    if (!selectedTinh || !selectedQuanHuyen || !selectedPhuongXa) {
      setErrorMessage(
        "Vui lòng chọn đầy đủ thông tin: Tỉnh, Quận/Huyện và Phường/Xã."
      );
      alert("Vui lòng điền đủ các thông tin.");
      return;
    }

    const totalPayment = totalPriceCart - discount;
    // Tạo một mã giao dịch tạm thời cho app_trans_id
    const tempAppTransId = `temp_${Date.now()}`;

    const orderData = {
      id_user: userId,
      id_promotion: discountID || "none",
      total_order: totalPayment,
      discount: discount || 0,
      name_user: userData.name_user,
      phoneNumber_user: userData.phoneNumber_user,
      address_user: `${selectedTinhName}, ${selectedQuanHuyenName}, ${selectedPhuongXaName}, ${userData.address_user}`,
      note_order: userData.note_order,
      date_order: new Date().toISOString(),
      method_pay_type: "ZaloPay",
      method_pay_status: "chưa thanh toán",
      app_trans_id: tempAppTransId,
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
      // Gửi đơn hàng lên server
      const orderResponse = await fetch(
        "http://localhost:3001/cartsAPI/orderzalopay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!orderResponse.ok) {
        console.error("Lỗi tạo đơn hàng");
        return;
      }

      // Tạo thanh toán với ZaloPay
      const zaloPayResponse = await fetch(
        `http://localhost:3001/zaloPayAPI/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Thanh Toán The Gold Coffee",
            amount: totalPayment,
            description: `The Gold Coffee - Thanh toán đơn hàng #${orderData.id_user}`,
            tempAppTransId: tempAppTransId,
          }),
        }
      );

      if (zaloPayResponse.ok) {
        const data = await zaloPayResponse.json();
        if (data.order_url) {
          dispatch(clearAllCart());
          // Điều hướng người dùng tới URL thanh toán
          window.location.href = data.order_url;
        }
      } else {
        console.error("Lỗi kết nối đến ZaloPay.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  async function checkKM(code: string) {
    try {
      const response = await fetch(
        `http://localhost:3001/promotionsAPI/checkcode/${code}`
      );
      if (!response.ok) {
        throw new Error("Mã khuyến mãi không hợp lệ hoặc không tồn tại.");
      }
      const data = await response.json();
      console.log(data.message);

      if (data?.message == "Khuyến mãi đã hết lượt dùng.") {
        alert(
          "Khuyến mãi này đã được dùng hết. Vui lòng kiểm tra lại TỔNG TIỀN hoặc chọn khuyến mãi khác."
        );
        return 500;
      }
      return 200;
    } catch (error) {
      throw error; // Ném lỗi lên trên để ngừng xử lý tiếp
    }
  }

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
                {/* <div className="input-payment">
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
                </div> */}

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
                  <select name="" id="" onChange={handleTinh}>
                    <option value="">Tỉnh Thành</option>
                    {tinhs.length > 0 &&
                      tinhs.map((tinh) => (
                        <option key={tinh?.id} value={tinh.id}>
                          {tinh.full_name}
                        </option>
                      ))}
                  </select>
                  <select name="" id="" onChange={handleQuanHuyen}>
                    <option value="">Quận Huyện</option>
                    {quanhuyens.length > 0 &&
                      quanhuyens.map((quanhuyen) => (
                        <option key={quanhuyen.id} value={quanhuyen.id}>
                          {quanhuyen.full_name}
                        </option>
                      ))}
                  </select>

                  <select name="" id="" onChange={handlePhuongXa}>
                    <option value="">Phường Xã</option>
                    {phuongxas.length > 0 &&
                      phuongxas.map((phuongxa) => (
                        <option key={phuongxa?.id} value={phuongxa.id}>
                          {phuongxa.full_name}
                        </option>
                      ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Địa chỉ chi tiết"
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
              </div>

              <button
                className="main-btn main-btn__payment"
                onClick={handleOrderSubmit}
              >
                Thanh Toán Khi Nhận Hàng
              </button>
              <button
                className="main-btn main-btn__payment zalopay-button"
                onClick={handleOrderSubmitZaloPay}
              >
                Thanh Toán Trước Với ZaloPay
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
                      <p className="price-subtotal">
                        -{discount.toLocaleString()}đ
                      </p>
                    </div>
                    {/* <div className="result-subtotal result-subtotal__0">
                      <p className="title-subtotal">Phí vận chuyển</p>
                      <p className="price-subtotal">+15,000đ</p>
                    </div> */}
                    <div className="result-subtotal result-subtotal__1">
                      <p className="title-subtotal">Tổng thanh toán</p>
                      <p className="price-subtotal">
                        {(totalPriceCart - discount).toLocaleString()}đ
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
