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
    if (loading) return; // evita doble clic
    setLoading(true);

    try {
      // 🟢 Si no existe carrito → enviamos null
      const idCarritoGuardado = localStorage.getItem("idCarrito");
      const idCarrito =
        idCarritoGuardado && idCarritoGuardado !== "0"
          ? Number(idCarritoGuardado)
          : null;

      // Llamada a la API
      const data = await crearOAgregar(idCarrito, producto.id, cantidad);

      // Guardar ID del carrito creado/actualizado
      if (data?.id) {
        localStorage.setItem("idCarrito", data.id);
      }

      // Notificación elegante (sin alert)
      toastSuccess(`${producto.nombre} agregado al carrito 🛒`);
    } catch (err) {
      console.error(err);
      toastError("No se pudo agregar al carrito");
    }

    setLoading(false);
  };

  // Mini sistema de notificaciones (temporal o lo reemplazamos por Toast real)
  const toastSuccess = (msg) => alert(msg);
  const toastError = (msg) => alert(msg);

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
