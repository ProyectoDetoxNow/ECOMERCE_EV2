"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { obtenerProductos, eliminarProducto } from "../data/productosData";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleEliminar = (id) => {
    eliminarProducto(id);
    setProductos(obtenerProductos());
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4">
            <div className="card shadow h-100" style={{ cursor: "pointer" }}>
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                className="card-img-prod mx-auto d-block"
                width={180}
                height={180}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>

                <div className="d-flex justify-content-between">
                  <Link
                    href={`/detProducto?producto=${producto.id}`}
                    className="btn btn-outline-success"
                  >
                    Ver detalle
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
