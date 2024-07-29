import Product from "./page";
import "../../../../public/css/product.css"

export default function ProductList() {
   return (
      <>
         <div className="main-product">
            <div className="container-product">
               <div className="list-product">
                  <Product />
               </div>
            </div>
         </div>
      </>
   );
}