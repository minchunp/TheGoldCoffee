import React, { useEffect } from "react";
import "../../../../../public/css/modal.css"
import Link from "next/link";

interface ModalProps {
   isOpen: boolean,
   onClose: () => void
}

const ModalNavagation: React.FC<ModalProps> = ({isOpen, onClose}) => {
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
         <div className={`main-modal-confirm ${isOpen?'open':''}`} onClick={onClose}>
            <div className="container-modal-confirm">
               <i className="bi bi-dash-circle" />
               <p>Bạn chưa đăng nhập tài khoản, hãy đăng nhập ngay!</p>
               <div className="container-btn-modal">
                  <button onClick={onClose} className="main-btn main-btn__modalConfirm">Quay lại</button>
                  <Link href="/login">
                     <button className="main-btn main-btn__modalConfirm">Tiếp tục</button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   )
}

export default ModalNavagation;
