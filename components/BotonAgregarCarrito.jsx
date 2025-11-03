"use client";
import { useCart } from "@/components/CartContext";

export default function BotonAgregarCarrito({ producto, className = "" }) {
  const { addToCart } = useCart();

  const handleAgregar = () => {
    addToCart(producto);
    alert(`${producto.nombre} agregado al carrito 🛒`);
  };

  return (
    <button onClick={handleAgregar} className={`btn btn-success ${className}`}>
      <i className="bi bi-cart-plus"></i> Agregar al carrito
    </button>
  );
}
