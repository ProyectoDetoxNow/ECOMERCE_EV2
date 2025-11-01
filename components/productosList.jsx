"use client";

import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ProductosList() {
  const productos = [
    {
      id: "batido-verde",
      nombre: "Batido Verde Clásico",
      descripcion: "Rico en clorofila y antioxidantes...",
      imagen: "/imagenes/Batido Verde Clásico.jpg",
    },
    {
      id: "batido-tropical",
      nombre: "Batido Tropical Detox",
      descripcion: "Refrescante y digestivo...",
      imagen: "/imagenes/Batido Tropical Detox.jpg",
    },
    {
      id: "batido-limon-chia",
      nombre: "Batido Limón & Chía",
      descripcion: "Hidratante y depurativo...",
      imagen: "/imagenes/Batido Limón & Chía.jpg",
    },
    {
      id: "batido-rojo",
      nombre: "Batido Rojo Antioxidante",
      descripcion: "Potente fuente de antioxidantes...",
      imagen: "/imagenes/BATIDO ROJO.jpg",
    },
    {
      id: "batido-verde-dulce",
      nombre: "Batido Verde Dulce",
      descripcion: "Combina lo detox del verde con un toque dulce natural...",
      imagen: "/imagenes/BATIDO VERDE DULCE.jpg",
    },
    {
      id: "batido-cremoso",
      nombre: "Batido Cremoso Detox",
      descripcion: "Cremoso, saciante y naturalmente delicioso...",
      imagen: "/imagenes/BATIDO CREMOSO.jpg",
    },
  ];

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
                  <button className="btn btn-success">
                    <i className="bi bi-cart-plus"></i> Agregar
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
