"use client";

import { useState } from "react";
import { crearOAgregar } from "@/services/apiCarrito";

export default function BotonAgregarCarrito({
  producto,
  cantidad = 1,
  className = "",
}) {
  const [loading, setLoading] = useState(false);

  const handleAgregar = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const idLocal = localStorage.getItem("idCarrito");
      const idCarrito = idLocal ? Number(idLocal) : null;

      const data = await crearOAgregar(idCarrito, producto.id, cantidad);

      if (data?.id) localStorage.setItem("idCarrito", data.id);

      // 🔥 Notificar al NAVBAR para actualizar contador
      window.dispatchEvent(new Event("carritoActualizado"));

      alert(`${producto.nombre} agregado al carrito 🛒`);
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar al carrito");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleAgregar}
      disabled={loading}
      className={`btn btn-success ${className}`}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2"></span>
          Agregando...
        </>
      ) : (
        <>
          <i className="bi bi-cart-plus"></i> Agregar al carrito
        </>
      )}
    </button>
  );
}
