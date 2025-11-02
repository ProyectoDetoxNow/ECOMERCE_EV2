"use client";
import { useState, useEffect } from "react";

const CAR_KEY = "carrito";
const COUPON_KEY = "carritoCupon";

export default function useCarrito() {
  const [carrito, setCarrito] = useState([]);
  const [cupon, setCupon] = useState("");
  const [totales, setTotales] = useState({ subtotal: 0, descuento: 0, total: 0 });
  const [cartCount, setCartCount] = useState(0);

  // --- Helpers ---
  const formatPrice = (n) => (Number(n) || 0).toLocaleString("es-CL");

  const getCarrito = () => JSON.parse(localStorage.getItem(CAR_KEY) || "[]");
  const saveCarrito = (c) => localStorage.setItem(CAR_KEY, JSON.stringify(c));

  const getCoupon = () => localStorage.getItem(COUPON_KEY) || "";
  const saveCoupon = (code) => {
    if (code) localStorage.setItem(COUPON_KEY, code);
    else localStorage.removeItem(COUPON_KEY);
  };

  const calculateTotals = (carrito, coupon) => {
    const subtotal = carrito.reduce((s, it) => s + Number(it.precio) * Number(it.cantidad), 0);
    const rate = coupon === "DESCUENTO10" ? 0.1 : 0;
    const descuento = Math.round(subtotal * rate);
    const total = subtotal - descuento;
    return { subtotal, descuento, total, rate, coupon };
  };

  // --- Funciones de control ---
  const agregarProducto = (item) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === item.id);
      let nuevo;
      if (existe) {
        nuevo = prev.map((p) =>
          p.id === item.id ? { ...p, cantidad: p.cantidad + item.cantidad } : p
        );
      } else {
        nuevo = [...prev, { ...item }];
      }
      saveCarrito(nuevo);
      return nuevo;
    });
  };

  // 🔥 SOLUCIÓN: Usar el ID del producto en lugar del índice
 
    setCarrito((prev) => {
      const nuevo = prev.map((item) => {
         const cambiarCantidad = (id, accion) => {if (item.id === id) {
          if (accion === "sumar") {
            return { ...item, cantidad: item.cantidad + 1 };
          } else if (accion === "restar") {
            return { ...item, cantidad: Math.max(0, item.cantidad - 1) };
          }
        }
        return item;
      }).filter(item => item.cantidad > 0); // Eliminar items con cantidad 0
      
      saveCarrito(nuevo);
      return nuevo;
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => {
      const nuevo = prev.filter(item => item.id !== id);
      saveCarrito(nuevo);
      return nuevo;
    });
  };

  const aplicarCupon = (code) => {
    const c = code.trim().toUpperCase();
    if (!c) return alert("Ingresa un código de cupón.");
    if (c === "DESCUENTO10") {
      saveCoupon(c);
      setCupon(c);
      alert("Cupón aplicado: 10% de descuento");
    } else {
      saveCoupon("");
      setCupon("");
      alert("Cupón inválido");
    }
  };

  // --- Efectos ---
  useEffect(() => {
    const stored = getCarrito();
    setCarrito(stored);
    setCupon(getCoupon());
  }, []);

  useEffect(() => {
    const totals = calculateTotals(carrito, cupon);
    setTotales(totals);
    const totalItems = carrito.reduce((s, it) => s + Number(it.cantidad), 0);
    setCartCount(totalItems);
  }, [carrito, cupon]);

  return {
    carrito,
    totales,
    cartCount,
    cupon,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto, // 🔥 Nueva función para eliminar
    aplicarCupon,
    formatPrice,
  };
}