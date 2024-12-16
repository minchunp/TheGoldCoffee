"use client"
import "../../../../public/css/promotion.css";
import "../../../../public/css/login_register.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCofirmCopy from "../components/modalConfirmCopy/page";

interface Promotion {
   _id: string;
   code_promotion: string;
   name_promotion: string;
   content_promotion: string;
   value_promotion: number;
   expiry_promotion: string;
   quantity_promotion: number;
}

const Promotions = () => {
   const [promotions, setPromotions] = useState<Promotion[]>([]);
   const [isOpenModal, setIsOpenModal] = useState(false);

   useEffect(() => {
      axios
         .get<Promotion[]>("http://localhost:3001/promotionsAPI/listPromotion")
         .then((response) => {
            setPromotions(response.data);
         })
         .catch((error) => {
            console.error("Có lỗi trong quá trình fetch dữ liệu mã khuyến mãi!!!", error);
         });
   }, []);

   const handleCopyCodePromotion = (code_promotion: string) => {
      navigator.clipboard
      .writeText(code_promotion)
      .then(() => {
         setIsOpenModal(true);
      })
      .catch((e) => {
         console.error("Có lỗi xảy ra!!!", e);
      })
   }
   const clodeModal = () => setIsOpenModal(false);

   return (
      <>
         <ModalCofirmCopy isOpen={isOpenModal} onClose={clodeModal} />
         {/* Section Login */}
         <section className="banner-title-other-page overlay-bg">
            <div className="main-title-other-page">
               <p>Trang chủ / Khuyến mãi</p>
            </div>
         </section>

         <div className="main-show-promotion">
            <div className="boxcenter">
               <div className="container-show-promotion">
                  {promotions.map((promo) => (
                     <div key={promo._id} className="box-promotion">
                        <img src="/images/_.jpeg" alt="" />
                        <div className="content-promotion">
                           <h2 className="name-promotion">{promo.name_promotion}</h2>
                           <p className="code-promotion">{promo.code_promotion}</p>
                           <p className="content-promotion">{promo.content_promotion}</p>
                           <p>Số lượng: {promo.quantity_promotion}</p>
                           <button onClick={() => handleCopyCodePromotion(promo.code_promotion)} className="main-btn main-btn__saveCodePromotion">Lấy mã</button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default Promotions;
