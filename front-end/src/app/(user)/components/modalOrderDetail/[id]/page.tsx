import { useEffect } from "react";
import "../../../../../../public/css/modalOrderDetail.css";

interface OrderDetail {
   productId: string;
   name_pro: string;
   img_pro: string;
   price_pro: number;
   sale_pro: number;
   size_pro: string;
   quantity_pro: number;
   toppings: string[];
}

interface ModalOrderDetailProps {
   id: string,
   isOpen: boolean,
   onClose: () => void
}

const ModalOrderDetail = ({id, isOpen, onClose}: ModalOrderDetailProps) => {
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }

      return () => {
         document.body.style.overflow = '';
      }
   }, [isOpen]);

   return (
      <>
         <div className={`main-bg-order-detail ${isOpen?'open':''}`} onClick={onClose}>
            <div className="main-modal-order-detail" onClick={(e) => e.stopPropagation()}>
               <h1>Danh sách sản phẩm trong đơn hàng</h1>
               <div className="infor-user-modal-order-detail">
                  <p>Tên khách hàng: <span>Huỳnh Minh Trung</span></p>
                  <p>Địa chỉ: <span>thành phố Hồ Chí Minh</span></p>
                  <p>Thời gian - Ngày đặt hàng: <span>20:00 5-11-2024</span></p>
                  <p>Trạng thái đơn hàng: <span>Chờ xác nhận</span></p>
               </div>
               <div className="title-modal-order-detail">
                  <p>Sản phẩm</p>
                  <p>Số lượng</p>
                  <p>Tổng tiền</p>
               </div>

               <div className="body-modal-order-detail">
                  <div className="item-modal-order-detail">
                     <div className="main-info-item-modal-order-detail">
                        <div className="img-item-modal-order">
                           <img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" />
                        </div>
                        <div className="content-item-modal-order">
                           <p>Tên sản phẩm</p>
                           <p>50,000đ</p>
                           <p>Toppings: Không có</p>
                        </div>
                     </div>
                     <div className="quantity-item-modal-order">1</div>
                     <div className="total-item-modal-order">50,000đ</div>
                  </div>

                  <div className="item-modal-order-detail">
                     <div className="main-info-item-modal-order-detail">
                        <div className="img-item-modal-order">
                           <img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" />
                        </div>
                        <div className="content-item-modal-order">
                           <p>Tên sản phẩm</p>
                           <p>50,000đ</p>
                           <p>Toppings: Không có</p>
                        </div>
                     </div>
                     <div className="quantity-item-modal-order">1</div>
                     <div className="total-item-modal-order">50,000đ</div>
                  </div>

                  <div className="subtotal-modal-order-detail">
                     <p>Tổng tiền đơn hàng: <span>100,000đ</span></p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ModalOrderDetail;
