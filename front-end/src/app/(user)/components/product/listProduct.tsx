import Product from "./page";
import "../../../../../public/css/product.css";
import React from "react";
import Slider from "react-slick";

interface ProductInterface {
   _id: string;
   id_cate: string;
   name_pro: string;
   img_pro: string;
   price_pro: number;
   sale_pro: number;
   disc_pro: string;
   salesVolume_pro: number;
   status_pro: number;
}

interface ProductListProps {
   products: ProductInterface[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      sslidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
   };

   return (
      <>
         <div className="boxcenter-productList">
            <div className="main-product-slieShow">
               <Slider {...settings}>
                  {products.map((pro) => {
                     return (
                        <div key={pro._id} className="box-product">
                           <Product product={pro} />
                        </div>
                     );
                  })}
               </Slider>
            </div>
         </div>

         {/* <div className="main-product">
            <div className="container-product">
               {products.map((pro) => {
                  return (
                     <div key={pro._id} className="box-product">
                        <Product product={pro} />
                     </div>
                  );
               })}
            </div>
         </div> */}
      </>
   );
};

export default ProductList;
