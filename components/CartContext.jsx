"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const CART_KEY = "cartItems";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setCartItems(stored);
    } catch (e) {
      console.error("Error al leer carrito:", e);
      setCartItems([]);
    }
  }, []);

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Quitar producto
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Cambiar cantidad
  const changeQuantity = (id, action) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  action === "sumar"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Cantidad total
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular subtotal / total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.precio,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
