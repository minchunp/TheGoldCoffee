import "../../../../public/css/navbar.css"

export default function Navbar() {
   return (
      <>
         <nav className="main-nav">
            <div className="boxcenter">
               <div className="top-nav">
                  <div className="container-top-nav">
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span><a href="#!">123 cửa hàng</a></span> trên khắp cả nước</p>
                     </div>
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span>Liên hệ đặt hàng tại:</span> 0123 456 789</p>
                     </div>
                     <div className="item-top-nav">
                        <i className="bi bi-check2"></i>
                        <p><span>100% SẢN PHẨM</span> được kiểm định chất lượng</p>
                     </div>
                  </div>
               </div> 

               <div className="bottom-nav">
                  <div className="container-bottom-nav">
                     <div className="main-logo-website">
                        <a href="/">
                           <img src="images/The Gold Coffee Logo SVG.png" alt="" />
                        </a>
                     </div>
                     <div className="right-func-bottom-nav">
                        <div className="input-search-nav">
                           <input type="text" placeholder="Bạn muốn tìm kiếm gì..." />
                           <i className="bi bi-search"></i>
                        </div>
                        <div className="func-user-nav">
                           <a className="func-account" href="#!"><i className="bi bi-person"></i></a>
                           <a className="func-cart" href="#!">
                              <div id="cart-count">0</div>
                              <i className="bi bi-bag"></i>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>  
            </div>

            {/* Main menu */}
            <div className="main-menu">
               <div className="boxcenter">
                  <div className="container-main-menu">
                     <div className="main-browse-cate">
                        <i className="bi bi-list"></i>
                        <p>Danh mục sản phẩm</p>
                        <i className="bi bi-chevron-down"></i>
                     </div>
                     <div className="menu">
                        <div className="item-menu"><a href="#!">Trang chủ</a></div>
                        <div className="item-menu"><a href="#!">Chuyện nhà</a></div>
                        <div className="item-menu"><a href="#!">Cửa hàng</a></div>
                        <div className="item-menu"><a href="#!">Khuyến mãi</a></div>
                        <div className="item-menu"><a href="#!">Tuyển dụng</a></div>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
}