"use client";
import { selectCartProducts } from "@/app/redux/cartSelector";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  if(!isClient) return (
    <Link className="func-cart" href="/cart">
      <i className="bi bi-bag"></i>
    </Link>
  )


  return (
    <Link className="func-cart" href="/cart">
      <span id="cart-count">{cartProducts.length}</span>
      <i className="bi bi-bag"></i>
    </Link>
  );
};

export default Cart;