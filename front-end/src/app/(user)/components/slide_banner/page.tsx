import "../../../../../public/css/slide.css"

export default function Slide() {
   return (
      <>
         <div className="main-slide">
            <div className="boxcenter">
               <div className="container-slide">
                  <div className="main-slide">
                     <div className="list-slide">
                        <div className="single-slide">
                           <img src="images/slide_banner_1.png" alt="" />
                           <div className="content-slide">
                              <h1>Tận hưởng coffee vào buổi sáng</h1>
                              <p>Tăng năng suất và cải thiện tâm trạng của bạn với một tách cà phê vào buổi sáng, 100% tự nhiên từ vườn.</p>
                              <button className="main-btn main-btn__banner">Thử ngay</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>            
         </div>
      </>
   );
}