"use client";

import DetalleProducto from "../../components/DetalleProductos";

export default function DetalleProductoPage() {
  return (
    <>
      {/* Banner */}
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

      {/* Contenido principal */}
      <DetalleProducto />
    </>
  );
}
