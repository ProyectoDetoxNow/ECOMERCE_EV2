"use client";

<<<<<<< HEAD
import React from "react";
import DetalleProducto from "@/components/DetalleProducto";

export default function DetalleProductoPage() {
  return (
    <>
=======
import { Suspense } from "react";
import DetalleProducto from "../../components/DetalleProductos";

export default function DetalleProductoPage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-5">Cargando producto...</p>}
    >
>>>>>>> main
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Detalle del Producto</h1>
      </div>
<<<<<<< HEAD
=======

      {/* ✅ Aquí dentro va tu componente */}
>>>>>>> main
      <DetalleProducto />
    </Suspense>
  );
}
