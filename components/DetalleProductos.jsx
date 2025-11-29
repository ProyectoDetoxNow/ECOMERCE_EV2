"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";

export default function DetalleProducto({ producto }) {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h3>Producto no encontrado</h3>
        <Link href="/productos" className="btn btn-success mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  // En caso de que el backend te dé precio como número
  const precioDisplay = producto.precioDisplay || `$${producto.precio}`;

  return (
    <>
      {/* Detalle principal */}
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-6 text-center">
            <Image
              src={`/imagenes/${encodeURIComponent(p.imagen)}`}
              alt={producto.nombre}
              width={500}
              height={400}
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="fw-bold">{producto.nombre}</h2>
              <span className="fs-5 text-success">{precioDisplay}</span>
            </div>

            <hr />
            <p>{producto.descripcion}</p>
            <hr />

            {/* Selección de cantidad */}
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <select
                id="cantidad"
                className="form-select"
                style={{ maxWidth: "120px" }}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Agregar al carrito */}
            <BotonAgregarCarrito
              producto={producto}
              cantidad={cantidad}
              className="btn btn-success btn-lg"
            />
          </div>
        </div>
      </div>

      {/* Productos relacionados (si el backend los provee en futuro) */}
      {producto.related?.length > 0 && (
        <div className="container my-5">
          <h3 className="mb-4 text-center">Productos Relacionados</h3>

          <div className="row g-3 justify-content-center">
            {producto.related.map((rel) => (
              <div key={rel.id} className="col-md-4">
                <div className="card shadow h-100">
                  <Image
                    src={rel.imagen}
                    alt={rel.nombre}
                    width={300}
                    height={200}
                    className="card-img-prod mx-auto d-block"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{rel.nombre}</h5>
                    <p className="card-text text-success">
                      {rel.precioDisplay || `$${rel.precio}`}
                    </p>
                    <Link
                      href={`/detProducto?producto=${rel.id}`}
                      className="btn btn-outline-success"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
