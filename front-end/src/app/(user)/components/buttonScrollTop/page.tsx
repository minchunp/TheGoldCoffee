import { useEffect, useRef, useState } from "react"
import "../../../../../public/css/buttonScrollTop.css"

export default function ButtonScrollTop() {
   // Sự kiện xuất hiện button scroll top
   const [isActive, setIsActive] = useState<boolean>(false);
   const btnSrollTop = useRef<HTMLButtonElement>(null);
   useEffect(() => {
      const handleActiveBtnScrollTop = () => {
         if (btnSrollTop.current) {
            if (window.scrollY > 1000) {
               setIsActive(true);
            } else {
               setIsActive(false);
            }
         }
      }
      
      window.addEventListener('scroll', handleActiveBtnScrollTop);
      
      return () => {
         window.removeEventListener('scroll', handleActiveBtnScrollTop);
      }
   },[]);

   // Sự kiện click vào button scroll top
   const handleBtnScrollTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      });
   }

   return (
      <>
         <button onClick={handleBtnScrollTop} ref={btnSrollTop} className={`main-btn main-btn__scrollTop ${isActive?'active':''}`}>
            <i className="bi bi-chevron-double-up"></i>
         </button>
      </>
   )
}