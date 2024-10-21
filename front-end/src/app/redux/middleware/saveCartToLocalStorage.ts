import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

const saveCartToLocalStorage: Middleware = store => next => action => {
   const result = next(action);

   const cartState = store.getState().cart;
   localStorage.setItem('cart', JSON.stringify(cartState.cartProducts));

   return result;
}

export default saveCartToLocalStorage;