"use client";

import { crearOAgregar } from "@/services/apiCarrito";

export default function BotonAgregarCarrito({
  producto,
  cantidad = 1,
  className = "",
}) {
  const handleAgregar = async () => {
    try {
      const idCarrito = localStorage.getItem("idCarrito");

      const data = await crearOAgregar(idCarrito, producto.id, cantidad);

      localStorage.setItem("idCarrito", data.id);

      alert(`${producto.nombre} agregado al carrito 🛒`);
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar al carrito");
    }
  };

  return (
    <button onClick={handleAgregar} className={`btn btn-success ${className}`}>
      <i className="bi bi-cart-plus"></i> Agregar al carrito
    </button>
  );
}
