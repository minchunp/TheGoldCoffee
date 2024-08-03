"use client"

import { createContext, ReactNode, useEffect, useState } from "react";

interface CartItem {
   _id: string,
   id_cate: string
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   disc_pro: string,
   salesVolume_pro: number,
   status_pro: number
   quantity_pro: number,
   size_pro: string
}

// Định nghĩa kiểu dữ liệu cho CartContex
interface CartContextType {
   items: CartItem[];
   addItem: (item: CartItem) => void;
   updateItem: (item: CartItem) => void;
   removeItem: (_id: string, size_pro: string) => void;
   clearItem: () => void;
}

const CartContex = createContext<CartContextType | undefined>(undefined);

// Tạo Provider CartContex
const CartProvider: React.FC<{children: ReactNode}> = ({children}) => {
   const [items, setItems] = useState<CartItem[]>([]);

   useEffect(() => {
      const saveItems = JSON.parse(localStorage.getItem("items") || "[]");
      setItems(saveItems);
   }, []);

   useEffect(() => {
      localStorage.setItem("items", JSON.stringify(items));
   }, [items]);

   const addItem = (item: CartItem) => {
      setItems(prevItems => {
         const existingItem = prevItems.find(i => i._id === item._id && i.size_pro === item.size_pro);
         if (existingItem) {
            return prevItems.map(i => i._id === item._id ? {...i, quantity_pro: i.quantity_pro + item.quantity_pro} : i);
         }
         return [...prevItems, item];
      });
   }

   // const existingItem = prevItems.find(i => i._id === item._id && i.size_pro === item.size_pro);
         // if (existingItem) {
         //    return prevItems.map(i => i._id === item._id ? {...i, quantity_pro: i.quantity_pro + item.quantity_pro} : i);
         // } 

   const updateItem = (item: CartItem) => {

   }

   const removeItem = (_id: string, size_pro: string) => {
      setItems(prevItems => prevItems.filter(item => (item._id !== _id && item.size_pro !== size_pro)));
   }

   const clearItem = () => {
      setItems([]);
   }
   
   return (
      <>
         <CartContex.Provider value={{items, addItem, updateItem, clearItem, removeItem}}>
            {children}
         </CartContex.Provider>
      </>
   )
}

export {CartProvider, CartContex}
