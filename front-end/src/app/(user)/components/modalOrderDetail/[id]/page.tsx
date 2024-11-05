import axios from "axios";
import { useEffect, useState } from "react";
import "../../../../../../public/css/modalOrderDetail.css";

interface OrderDetail {
   id_order: string;
   productId: string;
   name_pro: string;
   total_order:number;
   img_pro: string;
   price: number;
   sale_pro: number;
   size_pro: string;
   quantity: number;
   toppings?: string[];
}

interface ModalOrderDetailProps {
   id: string;
   isOpen: boolean;
   onClose: () => void;
}

const ModalOrderDetail = ({ id, isOpen, onClose }: ModalOrderDetailProps) => {
   const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
   const [totalOrder, settotalOrder] = useState<OrderDetail>();
   const [userInfo, setUserInfo] = useState({
      name: "",
      address: "",
      orderDate: "",
      status: ""
   });

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
         fetchOrderDetails();
      } else {
         document.body.style.overflow = "";
      }
      return () => {
         document.body.style.overflow = "";
      };
   }, [isOpen]);

   // Fetch order details
   const fetchOrderDetails = async () => {
      try {
         const response = await axios.get(
            `http://localhost:3001/cartsAPI/detailOrder/${id}`
         );
         const orderData = response.data;
         settotalOrder(orderData);
         // Fetch product details for each product in the order
         const products = await Promise.all(
            orderData.products.map(async (product: any) => {
               const productResponse = await axios.get(
                  `http://localhost:3001/productsAPI/proWithTopping/${product.productId}`
               );
               const productData = productResponse.data;
               return { ...product, ...productData.product };
            })
         );

         // Set order details and user info
         setOrderDetails(products);
         setUserInfo({
            name: orderData.name_user,
            address: orderData.address_user,
            orderDate: new Date(orderData.date_order).toLocaleString(),
            status: orderData.status_order
         });
      } catch (error) {
         console.error("Error fetching order details:", error);
         alert("Unable to fetch order details. Please try again.");
      }
   };

   return (
      <>
         <div
            className={`main-bg-order-detail ${isOpen ? "open" : ""}`}
            onClick={onClose}
         >
            <div
               className="main-modal-order-detail"
               onClick={(e) => e.stopPropagation()}
            >
               <h1>Order Details</h1>
               <div className="infor-user-modal-order-detail">
                  <p>Tên tài khoản: <span>{userInfo.name}</span></p>
                  <p>Địa chỉ: <span>{userInfo.address}</span></p>
                  <p>Thời gian - Ngày đặt hàng: <span>{userInfo.orderDate}</span></p>
                  <p>Trạng thái đơn hàng: <span>{userInfo.status}</span></p>
               </div>
               <div className="title-modal-order-detail">
                  <p>Sản phẩm</p>
                  <p>Số lượng</p>
                  <p>Tổng tiền</p>
               </div>

               <div className="body-modal-order-detail">
                  {orderDetails.map((product, index) => (
                     <div className="item-modal-order-detail" key={index}>
                        <div className="main-info-item-modal-order-detail">
                           <div className="img-item-modal-order">
                              <img
                                 src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL || ""}${product.img_pro}`}
                                 alt={product.name_pro}
                                 onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                       "/images/default-product.png";
                                 }}
                              />
                           </div>
                           <div className="content-item-modal-order">
                              <p>{product.name_pro}</p>
                              <p>{product.price.toLocaleString()}đ</p>
                              <p>
                                 Toppings:{" "}
                                 {product.toppings?.length
                                    ? product.toppings.join(", ")
                                    : "Không có"}
                              </p>
                           </div>
                        </div>
                        <div className="quantity-item-modal-order">{product.quantity}</div>
                        <div className="total-item-modal-order">
                           {(product.price * product.quantity).toLocaleString()}đ
                        </div>
                     </div>
                  ))}
                  <div className="subtotal-modal-order-detail">
                     <p>Tổng tiền đơn hàng: <span>{totalOrder?.total_order.toLocaleString()}đ</span></p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ModalOrderDetail;
