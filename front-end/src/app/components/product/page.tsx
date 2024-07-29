import "../../../../public/css/product.css"

// interface Product {
//    _id: string,
//    id_cate: string
//    name_pro: string,
//    img_pro: string,
//    price_pro: number,
//    sale_pro: number,
//    disc_pro: string,
//    salesVolume_pro: number,
//    status_pro: number
// }

export default function Product() {
   return (
      <>
         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm1</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>

         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm2</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>

         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm3</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>

         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm4</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>

         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm5</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>

         <div className="item-product">
            <a href="#!"><img src="images/1669736859_hi-tea-yuzu-tran-chau_400x400.png" alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href="#!">
                  <p>Tên sản phẩm6</p>
               </a>
               <div className="price-sale-product">
                  <p>40,000đ</p>
                  <p>55,000đ</p>
               </div>
            </div>
         </div>
      </>
   );
}