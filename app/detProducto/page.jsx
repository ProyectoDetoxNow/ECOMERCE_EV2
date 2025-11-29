"use client";

import React from "react";
import DetalleProducto from "@/components/DetalleProducto";

export default function DetalleProductoPage() {
  return (
    <>
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
      <DetalleProducto />
    </>
  );
}
