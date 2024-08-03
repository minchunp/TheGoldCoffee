import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import Providers from "@/redux/providers";
import { CartProvider } from "../context/cartContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Gold Coffee",
  description: "Trang web bán nước của The Gold Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar/>
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
