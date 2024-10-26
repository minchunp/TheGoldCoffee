const loadCartFromLocalStorage = () => {
   try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
         return undefined;
      } 
      return JSON.parse(serializedCart);
   } catch (error) {
      console.error("Đang có lỗi xảy ra khi load giỏ hàng từ LocalStorage", error);
      return undefined;
   }
}

export default loadCartFromLocalStorage;