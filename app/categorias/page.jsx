"use client";
import { useState } from "react"; // ✅ Agregar este import
import Image from "next/image"; // ✅ Agregar este import
import { obtenerProductos } from "../../data/productosData";

export default function CategoriasPage() {
  const productos = obtenerProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const filtrados = categoriaSeleccionada
    ? productos.filter((p) => p.categoria === categoriaSeleccionada)
    : productos;

  return (
    <div className="container py-4">
      <h3 className="mb-3 text-center">Categorías de Batidos</h3>

      <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
        <button
          className={`btn ${
            !categoriaSeleccionada ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setCategoriaSeleccionada("")}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              categoriaSeleccionada === cat
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtrados.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card shadow h-100">
              <Image
                src={p.imagen}
                alt={p.nombre}
                width={180}
                height={180}
                className="mx-auto d-block mt-3"
              />
              <div className="card-body text-center">
                <h5>{p.nombre}</h5>
                <p className="text-muted small">{p.descripcion}</p>
                <span className="badge bg-success">{p.categoria}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
