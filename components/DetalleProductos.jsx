"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
=======
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "@/components/CartContext";
>>>>>>> main
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";
import { obtenerProductoPorId } from "@/services/inventarioApi";

export default function DetalleProducto() {
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("producto");
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (idProducto) {
      obtenerProductoPorId(idProducto)
        .then((prod) => setProducto(prod))
        .catch(() => setProducto(null));
    }
  }, [idProducto]);

  if (!producto) {
    return (
      <div className="container text-center my-5">
        <h3>Producto no encontrado</h3>
        <Link href="/productos" className="btn btn-success mt-3">Volver a Productos</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6 text-center">
          <Image
            src={`/imagenes/${producto.imagen}`}
            alt={producto.nombreProducto}
            width={500}
            height={400}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="fw-bold">{producto.nombreProducto}</h2>
            <span className="fs-5 text-success">${producto.precio}</span>
          </div>
          <hr />
          <p>{producto.descripcion}</p>
          <hr />
          <BotonAgregarCarrito
            producto={{
              id: producto.id,
              nombre: producto.nombreProducto,
              precio: producto.precio,
              imagen: producto.imagen,
              descripcion: producto.descripcion,
            }}
            cantidad={1}
            className="btn btn-success btn-lg"
          />
        </div>
      </div>
    </div>
  );
}
