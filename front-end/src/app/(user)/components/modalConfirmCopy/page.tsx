import React, { useEffect } from "react";
import "../../../../../public/css/modal.css"

interface ModalProps {
   isOpen: boolean,
   onClose: () => void
}

const ModalCofirmCopy: React.FC<ModalProps> = ({isOpen, onClose}) => {
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
               <i className="bi bi-check2-circle" />
               <p>Mã đã được lấy thành công!</p>
               <button onClick={onClose} className="main-btn main-btn__modalConfirm">Tiếp tục</button>
            </div>
         </div>
      </>
   )
}

export default ModalCofirmCopy;
