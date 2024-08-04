import Link from "next/link";
import "../../../../../public/css/addProductAdmin.css";

const AddTopping = () => {
   return (
      <>
         <section>
            <div id="add-product-page" className="add-product">
               <div className="boxcenter">
                  <div className="title-product">
                     <h1>Thêm topping</h1>
                     <Link href="/admin/toppings">
                        <i id="return-main-product-btn" className="bi bi-arrow-left-short"></i>
                     </Link>
                  </div>

                  <div className="container-add-product">
                     <div className="box-demo-add">
                        <div className="box-featured-product">
                           <div className="product-image">
                              <div className="box-toggle-image">
                                 <i className="bi bi-image"></i>
                              </div>
                           </div>

                           <div className="product-content">
                              <div className="product-name">
                                 <a href="#">
                                    <h3>Tên sản phẩm</h3>
                                 </a>
                              </div>

                              <div className="product-price">
                                 <p>Giá sản phẩm</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="box-input-add">
                        <div className="element-input">
                           <p>Tên sản phẩm</p>
                           <input type="text" placeholder="Tên sản phẩm" />
                        </div>
                        <div className="element-input">
                           <p>Ảnh sản phẩm</p>
                           <input type="file" />
                        </div>
                        <div className="element-input">
                           <p>Giá sản phẩm</p>
                           <input type="text" placeholder="Giá sản phẩm" />
                        </div>
                        <div className="element-input">
                           <p>Trạng thái</p>
                           <input type="checkbox" id="tagSale-product" />
                        </div>
                        <button id="add-product">Thêm sản phẩm</button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default AddTopping;
