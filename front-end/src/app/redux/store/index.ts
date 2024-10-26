import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cartSlice";
import saveCartToLocalStorage from "../middleware/saveCartToLocalStorage";
import loadCartFromLocalStorage from "../localStorage";

// Định nghĩa interface cho sản phẩm được thêm vào giỏ hàng
interface CartProduct {
   productId: string,
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   size_pro: string,
   quantity_pro: number,
   toppings: any
}

interface CartState {
   cartProducts: CartProduct[];
}

const preloadedState: { cart: CartState } = {
   cart: {
      cartProducts: loadCartFromLocalStorage() || [],
   },
};

const store = configureStore({
   reducer: {
      cart: cartReducer,
   },
   preloadedState,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveCartToLocalStorage),
});

// Xuất các kiểu dữ liệu của store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;