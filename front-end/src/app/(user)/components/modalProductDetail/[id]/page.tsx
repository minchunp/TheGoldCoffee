import axios from "axios";
import useSWR from "swr";
import "../../../../../../public/css/detail.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/app/redux/cartSlice";
import ModalCofirm from "../../modalCofirm/page";

interface ModalProductDetailProps {
   id: string;
   isOpen: boolean;
   onClose: () => void;
}

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

// { id, isOpen, onClose }: ModalProductDetailProps
function ModalProductDetail({ id, isOpen, onClose }: ModalProductDetailProps) {
   const [topping_pro, setToppingPro] = useState<string[]>([]);
   const [size_pro, setSize_pro] = useState("S");
   const [quantity_pro, setQuantityPro] = useState(1);
   const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }

      return () => {
         document.body.style.overflow = "";
      };
   }, [isOpen]);

   // Fetch API Product detail
   const fetcher = (url: string) => axios.get(url).then((res) => res.data);
   const { data, error } = useSWR<ProductWithToppings>(`${process.env.NEXT_PUBLIC_API_URL}/proWithTopping/${id}`, fetcher);
   if (error) return <strong className="fetch">Không tải được chi tiết sản phẩm</strong>;
   if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>;

   // Hàm xử lý checkbox toppings
   const handleCheckBoxTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
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
         let priceBySize = 0;
         if (size_pro == "S") {
            priceBySize = product.product.price_pro
         } else if (size_pro == "M") {
            priceBySize = product.product.price_pro + 5000;
         } else if (size_pro == "L") {
            priceBySize = product.product.price_pro + 10000;
         }

         const productInCart = {
            productId: product._id,
            name_pro: product.product.name_pro,
            img_pro: product.product.img_pro,
            price_pro: priceBySize,
            sale_pro: product.product.sale_pro,
            size_pro: size_pro,
            quantity_pro: quantity_pro,
            toppings: topping_pro,
         };
         console.log(productInCart);

         dispatch(addProductToCart(productInCart));
      }
   };

   const openModalConfirm = () => setIsModalOpenConfirm(true);
   const closeModalConfirm = () => setIsModalOpenConfirm(false);

   // Sự kiện Onclick tổng hợp
   const totalOnclick = (product: ProductWithToppings) => {
      handleAddToCart(product);
      openModalConfirm();
   };

   return (
      <>
         <ModalCofirm isOpen={isModalOpenConfirm} onClose={closeModalConfirm} />
         <div className={`main-bg-modal-product-detail ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="container-body-product-detail modal-product-detail" onClick={(e) => e.stopPropagation()}>
               <section className="main-img-product-detail">
                  <div className="top-big-img-product-detail">
                     <img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${data.product.img_pro}`} alt="" />
                     {/* <img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /> */}
                  </div>
               </section>

               <section className="main-info-product-detail">
                  <div className="name-product-detail">
                     <h1>{data.product.name_pro}</h1>
                     {/* <h1>Tên sản phẩm</h1> */}
                  </div>

                  <div className="price-sale-product-detail">
                     {data.product.sale_pro != 0 ? (
                        <>
                           <p className="price-product-detail">{data.product.sale_pro.toLocaleString()}đ</p>
                           <p className="sale-product-detail">{data.product.price_pro.toLocaleString()}đ</p>
                        </>
                     ) : (
                        <p className="price-product-detail">{data.product.price_pro.toLocaleString()}đ</p>
                     )}
                     {/* <p className="price-product-detail">50,000đ</p> */}
                  </div>

                  <div className="short-description-product-detail">
                     <p>{data.product.disc_pro}</p>
                     {/* <p>Mô tả</p> */}
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
                        <input type="number" defaultValue={1} onChange={(e) => setQuantityPro(Number(e.target.value))} />
                     </div>
                  </div>

                  {data.toppings.length != 0 && (
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
                                       <img src={`${process.env.NEXT_PUBLIC_IMAGE_TOPPING_URL}${top.img_topping}`} alt="" />
                                    </label>
                                 </>
                              );
                           })}
                        </div>
                     </div>
                  )}

                  <div className="container-button-pro-detail">
                     <button onClick={() => totalOnclick(data)} className="main-btn main-btn__addCartDetail">
                        Thêm vào giỏ hàng
                     </button>
                  </div>
               </section>
            </div>
         </div>
      </>
   );
}

export default ModalProductDetail;
