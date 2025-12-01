"use client";

import { Suspense } from "react";
import DetalleProducto from "../../components/DetalleProductos";
import { obtenerProductoPorId } from "../../services/inventarioApi";

export default async function DetalleProductoPage({ searchParams }) {
  const id = searchParams.producto;

  const productoEncontrado = await obtenerProductoPorId(id);

  return (
    <Suspense
      fallback={<p className="text-center mt-5">Cargando producto...</p>}
    >
    <>
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("./public/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Detalle del Producto</h1>
      </div>

      {/* ✅ Aquí dentro va tu componente */}
      <DetalleProducto />
    </Suspense>
      <DetalleProducto producto={productoEncontrado} />
    </>
  );
}
//test