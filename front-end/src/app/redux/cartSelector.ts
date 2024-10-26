import { RootState } from "./store";

// Danh sách tất cả sản phẩm trong cart
export const selectCartProducts = (state: RootState) => state.cart.cartProducts;

// Tổng số tiền các sản phẩm có trong cart
export const selectCartTotal = (state: RootState) => 
   state.cart.cartProducts.reduce((total, pro) => total + (pro.sale_pro > 0 ? pro.sale_pro : pro.price_pro) * pro.quantity_pro, 0);