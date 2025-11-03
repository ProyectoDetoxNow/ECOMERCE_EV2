"use client";
import Image from "next/image";

export default function BlogCard({ caso, onVerCaso }) {
  return (
    <div className="dato-card row align-items-center my-4 shadow-sm p-3 rounded">
      <div className="col-md-8">
        <h5>
          {caso.id}. {caso.titulo}
        </h5>
        <p>{caso.perfil}</p>
        <button className="btn btn-success" onClick={() => onVerCaso(caso.id)}>
          Ver Caso
        </button>
      </div>
      <div className="col-md-4 text-center">
        <Image
          src={caso.imagen}
          alt={caso.titulo}
          width={300}
          height={200}
          className="rounded shadow-sm img-fluid"
        />
      </div>
    </div>
  );
}
