"use client";
import React, { useContext, useEffect, useState } from "react";
import "../../../../../public/css/detail.css";
import "../../../../../public/css/login_register.css";
import useSWR from "swr";
import axios from "axios";
import jwt from "jsonwebtoken"; // Import thư viện jsonwebtoken để giải mã token
import { CartContex } from "@/app/context/cartContext";
import Modal from "../../components/modalCofirm/page";
import ModalCofirm from "../../components/modalCofirm/page";
import ModalNavagation from "../../components/modalNavigation/page";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/app/redux/cartSlice";

interface ProductInterface {
  _id: string;
  id_cate: string;
  name_pro: string;
  img_pro: string;
  price_pro: number;
  sale_pro: number;
  disc_pro: string;
  salesVolume_pro: number;
  status_pro: number;
}

interface ToppingInterface {
  _id: string;
  id_cate: string;
  img_topping: string;
  name_topping: string;
  price_topping: number;
  status_topping: string;
}

interface ProductWithToppings {
  _id: string;
  product: ProductInterface;
  toppings: ToppingInterface[];
}

// Kiểu dữ liệu người dùng
interface User {
  id: string;
  name_user: string;
  role_user: string;
  email_user: string;
}

function ProductDetail({ params }: { params: { id: string } }) {
  const [topping_pro, setToppingPro] = useState<string[]>([]);
  const [size_pro, setSize_pro] = useState("S");
  const [quantity_pro, setQuantityPro] = useState(1);
  const [isModalOpenNavigation, setIsModalOpenNavigation] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

  // State lưu dữ liệu comment
  const [comments, setComments] = useState<any[]>([]);

  const [comment, setComment] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Lấy dữ liệu từ các input
    const data = {
      id_pro: params.id, // Cần truyền id sản phẩm từ props hoặc trạng thái khác
      id_user: user?.id, // Lấy từ user đã lưu
      name_user: user?.name_user,
      email: user?.email_user,
      content_comment: comment,
      date_comment: new Date(), // Định dạng ngày giờ hiện tại
    };

    try {
      const response = await fetch("http://localhost:3001/CommentsAPI/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //   alert("Bình luận đã được gửi thành công!");
        window.location.reload();
      } else {
        alert("Có lỗi xảy ra khi gửi bình luận.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Có lỗi xảy ra khi gửi bình luận.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/CommentsAPI/getByProduct/${params.id}`
        );
        if (!response.ok) throw new Error("Lỗi khi tải dữ liệu");
        const data = await response.json();
        setComments(data);

        // Giả lập log sau khi state được cập nhật
        setTimeout(() => {
          console.log("Comments after update:", data);
          console.log(comments);
        }, 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [params.id]);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decoded = jwt.decode(token) as {
          id: string;
          name_user: string;
          role_user: string;
          email_user: string;
        };

        // Lưu thông tin vào state
        setUser({
          id: decoded.id,
          name_user: decoded.name_user,
          role_user: decoded.role_user,
          email_user: decoded.email_user,
        });
        console.log(decoded);
        console.log("I " + user);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, []); // Chạy once khi component mount

  // Fetch API Product detail
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<ProductWithToppings>(
    `${process.env.NEXT_PUBLIC_API_URL}/proWithTopping/${params.id}`,
    fetcher
  );
  if (error)
    return <strong className="fetch">Không tải được chi tiết sản phẩm</strong>;
  if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>;

  // Lấy token từ localStorage và giải mã token để lấy thông tin người dùng

  // Sử dụng Context
  // const context = useContext(CartContex);
  // if (!context) {
  //    throw new Error('Trang chi tiết sản phẩm phải được sử dụng trong CartProvider!');
  // }
  // const {addItem} = context;

  // Sự kiện thêm sản phẩm vào giỏ hàng bằng ContextAPI
  // const handleAddToCart = (product: ProductInterface) => {
  //    console.log({...product, quantity_pro: quantity_pro, size_pro: size_pro})
  //    if (product) {
  //       addItem({...product, quantity_pro: quantity_pro, size_pro: size_pro});
  //    }
  // }

  // Hàm xử lý checkbox toppings
  const handleCheckBoxTopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setToppingPro((prevItems) => {
      if (prevItems.includes(value)) {
        return prevItems.filter((item) => item != value);
      } else {
        return [...prevItems, value];
      }
    });
  };

  // Sử dụng Redux
  const dispatch = useDispatch();
  const handleAddToCart = (product: ProductWithToppings) => {
    if (product) {
      const productInCart = {
        productId: params.id,
        name_pro: product.product.name_pro,
        img_pro: product.product.img_pro,
        price_pro: product.product.price_pro,
        sale_pro: product.product.sale_pro,
        size_pro: size_pro,
        quantity_pro: quantity_pro,
        toppings: topping_pro,
      };
      console.log(productInCart);

      dispatch(addProductToCart(productInCart));
    }
  };

  // Sự kiện mở/đóng Modal
  const user_account = false; // Check xem có tài khoản người dùng hay không
  // Xử lý thêm để đúng logic (này chỉ là ví dụ)
  const openModal = () => setIsModalOpenConfirm(true);
  const closeModal = () => setIsModalOpenConfirm(false);

  // Sự kiện Onclick tổng hợp
  const totalOnclick = (product: ProductWithToppings) => {
    handleAddToCart(product);
    openModal();
  };

  return (
    <>
      {/* Banner title other page on website Vegist */}
      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          <p>Trang chủ / {data.product.name_pro}</p>
        </div>
      </section>

      {/* Main body product detail */}
      <main className="body-product-detail">
        <ModalCofirm isOpen={isModalOpenConfirm} onClose={closeModal} />
        <ModalNavagation isOpen={isModalOpenNavigation} onClose={closeModal} />
        <div className="boxcenter">
          <div className="container-body-product-detail">
            <section className="main-img-product-detail">
              <div className="top-big-img-product-detail">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${data.product.img_pro}`}
                  alt=""
                />
              </div>
            </section>

            <section className="main-info-product-detail">
              <div className="name-product-detail">
                <h1>{data.product.name_pro}</h1>
              </div>

              <div className="price-sale-product-detail">
                {data.product.sale_pro != 0 ? (
                  <>
                    <p className="price-product-detail">
                      {data.product.sale_pro.toLocaleString()}đ
                    </p>
                    <p className="sale-product-detail">
                      {data.product.price_pro.toLocaleString()}đ
                    </p>
                  </>
                ) : (
                  <p className="price-product-detail">
                    {data.product.price_pro.toLocaleString()}đ
                  </p>
                )}
              </div>

              <div className="short-description-product-detail">
                <p>{data.product.disc_pro}</p>
              </div>

              <div className="sizeAndFlavour-product-detail">
                <p>
                  Kích cỡ: <span>{size_pro}</span>
                </p>
                <div className="items-inputRadio-detail items-inputRadio-detail__size">
                  <input
                    type="radio"
                    name="size_pro_detail"
                    id="small"
                    value="S"
                    checked={size_pro == "S"}
                    onChange={(e) => setSize_pro(e.target.value)}
                  />
                  <label htmlFor="small">Nhỏ (+0đ)</label>

                  <input
                    type="radio"
                    name="size_pro_detail"
                    id="medium"
                    value="M"
                    checked={size_pro == "M"}
                    onChange={(e) => setSize_pro(e.target.value)}
                  />
                  <label htmlFor="medium">Vừa (+5,000đ)</label>

                  <input
                    type="radio"
                    name="size_pro_detail"
                    id="large"
                    value="L"
                    checked={size_pro == "L"}
                    onChange={(e) => setSize_pro(e.target.value)}
                  />
                  <label htmlFor="large">Lớn (+10,000đ)</label>
                </div>
              </div>

              <div className="quantity-pro">
                <div className="container-quantity-pro">
                  <p>Số lượng:</p>
                  <input
                    type="number"
                    defaultValue={1}
                    onChange={(e) => setQuantityPro(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="toppings-pro">
                <p>Toppings (tuỳ chọn):</p>
                <div className="container-toppings-pro">
                  {data.toppings.map((top) => {
                    return (
                      <>
                        <input
                          id={top._id}
                          type="checkbox"
                          value={top.name_topping}
                          onChange={handleCheckBoxTopping}
                          checked={topping_pro.includes(`${top.name_topping}`)}
                        />
                        <label htmlFor={top._id}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_TOPPING_URL}${top.img_topping}`}
                            alt=""
                          />
                        </label>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="container-button-pro-detail">
                <button
                  onClick={() => totalOnclick(data)}
                  className="main-btn main-btn__addCartDetail"
                >
                  Thêm vào giỏ hàng
                </button>
                <a href="#!">
                  <button className="main-btn main-btn__buyDetail">
                    Mua ngay
                  </button>
                </a>
              </div>

              <p className="id-product-detail">
                IDENTIFIER: <span>{data.product._id.slice(-4)}</span>
              </p>
            </section>

            <section className="special-offer">
              <div className="item-special-offer">
                <div className="main-icon-offer">
                  <i className="bi bi-truck"></i>
                </div>
                <div className="title-offer">
                  <h2>GIAO HÀNG</h2>
                </div>
                <div className="content-offer">
                  <p>
                    Với chỉ tiêu giao hàng tiện lợi và nhanh chóng, đảm bảo cho
                    bạn có trải nghiệm tốt nhất.
                  </p>
                </div>
              </div>

              <div className="item-special-offer">
                <div className="main-icon-offer">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="title-offer">
                  <h2>GIÁ THÀNH</h2>
                </div>
                <div className="content-offer">
                  <p>
                    Đảm bảo giá thành đi đôi với chất lượng, với đa dạng nhiều
                    loại mặt hàng với các mức giá ưu đãi.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Tab product detail  */}
      <section className="product-detail-tab">
        <div className="title-tab-product-detail">
          <div className="list-tab">
            <a className="active" href="#!">
              BÌNH LUẬN
            </a>
          </div>
        </div>
        <div className="body-content-tab-product-detail">
          <div className="boxcenter">
            <div className="tab-review" id="tab-review">
              <div className="form-review-customer">
                <form action="" onSubmit={handleSubmit}>
                  <div className="title-form-review">
                    <h2>Bình luận của bạn được viết tại đây</h2>
                  </div>
                  <div className="item-input-form-review">
                    <label htmlFor="name-user">Tên khách hàng</label>
                    <input
                      type="text"
                      id="name-user"
                      placeholder="Nhập tên của bạn"
                      value={user?.name_user}
                      readOnly
                    />
                  </div>
                  <div className="item-input-form-review">
                    <label htmlFor="email-user">Email</label>
                    <input
                      type="text"
                      id="email-user"
                      placeholder="example@gmail.com"
                      value={user?.email_user}
                      readOnly
                    />
                  </div>
                  <div className="item-input-form-review">
                    <label htmlFor="content-review">
                      Nội dung bình luận (1500)
                    </label>
                    <textarea
                      placeholder="Hãy nêu cảm nghĩ của bạn ở đây..."
                      id="content-review"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="btn-submit-review">
                    <button
                      type="submit"
                      className="main-btn main-btn__submit-review"
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </form>
              </div>
              {/* Hiển thị danh sách bình luận */}
              <div className="container-content-review-customer">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="single-review-customer">
                      <div className="name-customer">
                        <h3>{comment.name_user}</h3>
                      </div>
                      <div className="date-review">
                        <p>{comment.date_comment}</p>
                      </div>
                      <div className="main-content-review-customer">
                        <p>{comment.content_comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Chưa có bình luận nào cho sản phẩm này.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
