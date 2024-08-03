import "../../../../../public/css/footer.css"

const Footer = () => {
   return (
      <>
         <section className="main-footer">
            <div className="boxcenter">
               <ul className="container-footer">
                  <li className="item-footer">
                     <h2 className="title-item-footer">DỊCH VỤ</h2>
                     <ul>
                        <li><a href="#!">Về The Gold Coffee</a></li>
                        <li><a href="#!">Tuyển dụng</a></li>
                        <li><a href="#!">Liên hệ</a></li>
                        <li><a href="#!">Thông tin</a></li>
                        <li><a href="#!">Địa chỉ cửa hàng</a></li>
                     </ul>
                  </li>
                  <li className="item-footer">
                     <h2 className="title-item-footer">ĐIỀU KHOẢN</h2>
                     <ul>
                        <li><a href="#!">Chính sách thanh toán</a></li>
                        <li><a href="#!">Chính sách quyền riêng tư</a></li>
                        <li><a href="#!">Chính sách đổi trả</a></li>
                        <li><a href="#!">Chính sách mua hàng</a></li>
                        <li><a href="#!">Điều khoản sử dụng</a></li>
                     </ul>
                  </li>
                  <li className="item-footer">
                     <h2 className="title-item-footer">LIÊN HỆ</h2>
                     <div className="info-order">
                        <i className="bi bi-telephone-fill"></i>
                        <p>Đặt hàng: 0123 456 789</p>
                     </div>
                     <div className="info-order">
                        <i className="bi bi-geo-alt-fill"></i>
                        <p>QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh</p>
                     </div>
                  </li>
                  <li className="item-footer">
                     <div className="logo-footer">
                        <img src="images/The Gold Coffee Logo SVG.png" alt="" />
                        <p className="slogan-footer">Luôn quan tâm và mang đến cho bạn trải nghiệm tốt nhất.</p>
                        <div className="container-icon-social">
                           <a href="#!"><i className="bi bi-facebook"></i></a>
                           <a href="#!"><i className="bi bi-messenger"></i></a>
                           <a href="#!"><i className="bi bi-instagram"></i></a>
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="bottom-footer">
               <p>Copyright © 2024 by thegoldcoffeeshop</p>
            </div>
         </section>
      </>
   );
}

export default Footer;