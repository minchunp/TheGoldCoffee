import React from "react";
import "../../../../public/css/product.css"

interface ProductInterface {
   _id: string,
   id_cate: string
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   disc_pro: string,
   salesVolume_pro: number,
   status_pro: number
}

interface ProductProps {
   product: ProductInterface
}

const Product: React.FC<ProductProps> = ({product}) => {
   return (
      <>
         <div className="item-product" key={product._id}>
            <a href={`/product/${product._id}`}><img src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${product.img_pro}`} alt="" /></a>
            <div className="content-product">
               <a className="name-pro" href={`/product/${product._id}`}>
                  <p>{product.name_pro}</p>
               </a>
               <div className="price-sale-product">
                  <p>{product.price_pro.toLocaleString()}đ</p>
                  {/* <p>55,000đ</p> */}
               </div>
            </div>
         </div>
       </>
   );
}

export default Product;