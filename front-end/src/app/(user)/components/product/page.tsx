import React, { useState } from "react";
import "../../../../../public/css/product.css"
import Link from "next/link";
import ModalProductDetail from "../modalProductDetail/[id]/page";

interface ProductInterface {
   _id: string,
   id_cate: string
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   disc_pro: string,
   salesVolume_pro: number,
   status_pro: number,
}

interface ToppingInterface {
   _id: string;
  id_cate: string;
  img_topping: string;
  name_topping: string;
  price_topping: number;
  status_topping: string;
}

interface ProductWithToppings {
   _id: string,
   product: ProductInterface,
   toppings: ToppingInterface[]
}

interface ProductProps {
   product: ProductWithToppings,
   idProductDetail: (id: string) => void
}

const Product: React.FC<ProductProps> = ({product, idProductDetail}) => {
   return (
      <>
         <div className="item-product" key={product._id}>
            <div className="func-item-product">
               <img onClick={() => idProductDetail(product._id)} src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${product.product.img_pro}`} alt="" />
               <div className="container-func-item-product">
                  <div className="icon-func-item-product">
                     {/* Button khi nhấn vào sẽ mở modal product detail */}
                     <i onClick={() => idProductDetail(product._id)} className="bi bi-bag"></i>
                  </div>
                  <div className="icon-func-item-product">
                     <Link href={`/product/${product._id}`}><i className="bi bi-exclamation-lg"></i></Link>
                  </div>
               </div>
            </div>
            <div className="content-product">
               <div className="name-pro" >
                  <p>{product.product.name_pro}</p>
               </div>
               <div className="price-sale-product">
                  <p>{product.product.price_pro.toLocaleString()}đ</p>
                  {/* <p>55,000đ</p> */}
               </div>
            </div>
         </div>
       </>
   );
}

export default Product;