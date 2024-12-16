"use client";
import { useSelector } from "react-redux";
import "../../../../public/css/cart.css";
import "../../../../public/css/login_register.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { selectCartProducts, selectCartTotal } from "@/app/redux/cartSelector";
import { useDispatch } from "react-redux";
import {
  decQuantity,
  incQuantity,
  removeProductToCart,
} from "@/app/redux/cartSlice";
import { useRouter } from "next/navigation";

type DiscountData = {
  code: string;
  discount: number;
};

const Cart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const totalPriceCart = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const router = useRouter(); // Dùng để chuyển trang

  const [makm, setMakm] = useState(""); // Biến lưu mã khuyến mãi
  const [giamgia, setGiamGia] = useState(0); // Biến lưu mã khuyến mãi
  const [tongtien, settongtien] = useState(0); // Biến lưu mã khuyến mãi
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);

  useEffect(() => {
    localStorage.removeItem("myObjectKey");
    settongtien(totalPriceCart);
  }, []); // Mảng dependencies rỗng

  useEffect(() => {
    const newTotal = totalPriceCart - giamgia;
    settongtien(newTotal > 0 ? newTotal : 0); // Tổng không âm
    console.log(newTotal, tongtien);
  }, [totalPriceCart, giamgia]);

  // Handle chọn Mã Khuyến Mãi
  const handleMaKm = async () => {
    if (makm.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:3001/promotionsAPI/checkcode/${makm}`
        );
        if (!response.ok) {
          throw new Error("Mã khuyến mãi không hợp lệ hoặc không tồn tại.");
        }
        const data = await response.json();
        console.log(data.message);

        if (data?.message == "Khuyến mãi đã hết lượt dùng.") {
          alert("Mã khuyến mãi sai hoặc đã hết hạn");
        }

        if (data?.message != "Khuyến mãi đã hết lượt dùng.") {
          setDiscountData(data);
          setGiamGia(data?.value_promotion);
          const myObject = {
            id: data?._id,
            makm: data?.code_promotion,
            value: data?.value_promotion, // Sử dụng giá trị từ API trực tiếp
          };
          // Chuyển đổi đối tượng thành chuỗi JSON
          const jsonString = JSON.stringify(myObject);
          // Lưu vào localStorage
          localStorage.setItem("myObjectKey", jsonString);
          settongtien(totalPriceCart - giamgia);
        }

        console.log(discountData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    } else {
      alert("Vui lòng nhập mã khuyến mãi.");
    }
  };

  const handleCheckout = () => {
    // Chuyển sang trang thanh toán
    router.push("/payment");
  };

  return (
    <>
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / Giỏ hàng của bạn</p>
        </div>
      </section>

      <main className="body-cart">
        <div className="boxcenter">
          <div className="container-body-cart">
            <div className="main-cart">
              <div className="title-cart">
                <p>Sản phẩm</p>
                <p>Số lượng</p>
                <p>Tổng tiền</p>
              </div>

              <div className="body-product-in-cart">
                {cartProducts && cartProducts.length > 0 ? (
                  cartProducts.map((item) => (
                    <div key={item.productId} className="product-in-cart">
                      <div className="product-cart product-cart__infor">
                        <div className="img-fucDel-product-cart">
                          <a href="#!">
                            <div className="img-product-cart">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${item.img_pro}`}
                                alt=""
                              />
                            </div>
                          </a>
                          <div className="delete-product-shopping-cart-index">
                            <button
                              onClick={() =>
                                dispatch(removeProductToCart(item))
                              }
                              className="delete-item-cart"
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                        <div className="main-infor-product-cart">
                          <a className="name-product-cart" href="#!">
                            {item.name_pro}
                          </a>
                          <p className="price-product-cart">
                            {item.price_pro.toLocaleString()}đ
                          </p>
                          <p className="size-flavout-product-cart">
                            Kích cỡ: <span>{item.size_pro}</span>
                          </p>
                          <p className="size-flavout-product-cart">
                            Toppings:{" "}
                            <span>
                              {item.toppings.length != 0
                                ? item.toppings.join(", ")
                                : "Không có"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="container-quantity-cart">
                        <div className="quantity-pro-cart">
                          <button
                            onClick={() => dispatch(decQuantity(item))}
                            className="decAndinc-quantity-product-cart"
                          >
                            -
                          </button>
                          {/* <input type="number" defaultValue={item.quantity_pro} /> */}
                          <div className="content-quantity-pro-cart">
                            {item.quantity_pro}
                          </div>
                          <button
                            onClick={() => dispatch(incQuantity(item))}
                            className="decAndinc-quantity-product-cart"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="product-cart product-cart__total">
                        <p className="total-product-cart">
                          {item.sale_pro != 0
                            ? (
                                item.sale_pro * item.quantity_pro
                              ).toLocaleString()
                            : (
                                item.price_pro * item.quantity_pro
                              ).toLocaleString()}
                          đ
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="error-empty-cart">
                    Không có sản phẩm trong giỏ hàng
                  </div>
                )}
              </div>

              <div className="footer-main-cart">
                <div className="discount-cart">
                  <input
                    className="discount-cart-input"
                    type="text"
                    placeholder="Nhập mã khuyến mãi"
                    value={makm}
                    onChange={(e) => setMakm(e.target.value)}
                  />
                  <button onClick={handleMaKm} className="icon-submit-discount">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>

                <div className="button-return-store">
                  <Link href="/">
                    <button className="main-btn main-btn__returnStore">
                      Quay về trang chủ
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="main-shipping-estimates">
              <div className="box-subtotal-cart">
                <h1>Ước tính vận chuyển</h1>
                {/* <div className="input-country-shipping">
                           <p>Địa chỉ</p>
                           <select name="country-shipping">
                              <option value="vietnam">Viet Nam</option>
                              <option value="England">England</option>
                              <option value="singapore">Singapore</option>
                              <option value="thailand">ThaiLand</option>
                           </select>
                        </div> */}

                <div className="container-subtotal">
                  <div className="result-subtotal result-subtotal__0">
                    <p className="title-subtotal">Tạm tính</p>
                    <p className="price-subtotal">
                      {totalPriceCart.toLocaleString()}đ
                    </p>
                  </div>
                  <div className="result-subtotal result-subtotal__0">
                    <p className="title-subtotal">Mã khuyến mãi</p>
                    <p className="price-subtotal">
                      - {giamgia.toLocaleString()}đ
                    </p>
                  </div>
                  <div className="result-subtotal result-subtotal__1">
                    <p className="title-subtotal">Tổng thanh toán</p>
                    <p className="price-subtotal">
                      {tongtien.toLocaleString()}đ
                    </p>
                  </div>
                </div>
                <p className="paragraph-on-boxShipping">
                  Quý khách xem kĩ giỏ hàng trước khi thanh toán.
                </p>

                <button
                  className="main-btn main-btn__checkout-shipping"
                  onClick={handleCheckout}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
