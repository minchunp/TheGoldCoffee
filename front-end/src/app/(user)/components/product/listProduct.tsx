import Product from "./page";
import "../../../../../public/css/product.css"
import React from "react";

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

interface ProductListProps {
   products: ProductInterface[]
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
   return (
      <>
         <div className="main-product">
            <div className="container-product">
               {
                  products.map(pro => {
                     return ( 
                        <div key={pro._id} className="box-product">
                           <Product product={pro} />
                        </div>
                     );
                  })
               }
            </div>
         </div>
      </>
   );
}

export default ProductList;