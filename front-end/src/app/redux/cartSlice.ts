import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa interface cho sản phẩm được thêm vào giỏ hàng
interface CartProduct {
   productId: string;
   name_pro: string;
   img_pro: string;
   price_pro: number;
   sale_pro: number;
   size_pro: string;
   quantity_pro: number;
   toppings: string[];
}

interface CartState {
   cartProducts: CartProduct[];
}

const initialState: CartState = {
   cartProducts: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      // Thêm sản phẩm vào giỏ hàng
      addProductToCart: (state, action: PayloadAction<CartProduct>) => {
         const product = action.payload;

         const sortedToppings = JSON.stringify([...product.toppings].sort());

         const existingProduct = state.cartProducts.find(
            (pro) =>
               pro.productId === product.productId && pro.size_pro === product.size_pro && JSON.stringify([...pro.toppings].sort()) === sortedToppings
            //  JSON.stringify(pro.toppings) === JSON.stringify(product.toppings)
         );
         if (existingProduct) {
            existingProduct.quantity_pro += product.quantity_pro;
         } else {
            state.cartProducts.push({ ...product });
         }
      },

      // Xoá sản phẩm khỏi giỏ hàng
      removeProductToCart: (state, action: PayloadAction<CartProduct>) => {
         const product = action.payload;
         const productSize = product.size_pro;
         const sortedToppings = JSON.stringify([...product.toppings].sort());
         state.cartProducts = state.cartProducts.filter(
            (pro) =>
               !(pro.productId === product.productId && pro.size_pro === productSize && JSON.stringify([...pro.toppings].sort()) === sortedToppings)
         );
      },

      // Tăng số lượng sản phẩm trong giỏ hàng
      incQuantity: (state, action: PayloadAction<CartProduct>) => {
         const sortedToppings = JSON.stringify([...action.payload.toppings].sort());
         const product = state.cartProducts.find(
            (pro) =>
               pro.productId === action.payload.productId &&
               pro.size_pro === action.payload.size_pro &&
               JSON.stringify([...pro.toppings].sort()) === sortedToppings
         );
         if (product) {
            product.quantity_pro += 1;
         }
      },

      // Giảm số lượng sản phẩm trong giỏ hàng
      decQuantity: (state, action: PayloadAction<CartProduct>) => {
         const sortedToppings = JSON.stringify([...action.payload.toppings].sort());

         const product = state.cartProducts.find(
            (pro) =>
               pro.productId === action.payload.productId &&
               pro.size_pro === action.payload.size_pro &&
               JSON.stringify([...pro.toppings].sort()) === sortedToppings
         );
         if (product && product.quantity_pro > 1) {
            product.quantity_pro -= 1;
         } else if (product && product.quantity_pro == 1) {
            // state.cartProducts = state.cartProducts.filter(
            //   (pro) =>
            //     !(
            //       pro.productId === action.payload.productId &&
            //       pro.size_pro === action.payload.size_pro
            //     )
            // );
            product.quantity_pro = 1;
         }
      },

      // Xoá tất cả các sản phẩm trong giỏ hàng
      clearAllCart: (state) => {
         state.cartProducts = [];
      },
   },
});

export const { addProductToCart, removeProductToCart, incQuantity, decQuantity, clearAllCart } = cartSlice.actions;
export default cartSlice.reducer;
