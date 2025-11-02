import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import NavbarDetox from "../components/NavBarDetox";
import Footer from "../components/Footer";
import NavBarDetox from "../components/NavBarDetox";
import { CartProvider } from "../components/CartContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Detox Now",
  description: "Tienda online de productos congelados para batidos detox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 👇 Envuelve toda la app con el proveedor del carrito */}
        <CartProvider>
          <NavBarDetox />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
