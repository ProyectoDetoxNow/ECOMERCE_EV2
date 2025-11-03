"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "@/components/CartContext";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";

export default function DetalleProducto() {
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("producto");

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart } = useCart();

  // Datos base de los productos
  const productos = {
    "batido-verde": {
      id: "batido-verde",
      nombre: "Batido Verde Clásico",
      precio: 3990,
      precioDisplay: "$3.990",
      imagen: "/imagenes/Batido Verde Clásico.jpg",
      descripcion:
        "Rico en clorofila y antioxidantes, ayuda a limpiar el sistema digestivo y aporta frescura. Ideal para comenzar el día ligero.",
      related: ["batido-tropical", "batido-limon-chia", "batido-rojo"],
    },
    "batido-tropical": {
      id: "batido-tropical",
      nombre: "Batido Tropical Detox",
      precio: 4200,
      precioDisplay: "$4.200",
      imagen: "/imagenes/Batido Tropical Detox.jpg",
      descripcion:
        "Refrescante y digestivo. La piña aporta bromelina y la cúrcuma potencia el efecto desintoxicante.",
      related: ["batido-verde", "batido-rojo", "batido-cremoso"],
    },
    "batido-limon-chia": {
      id: "batido-limon-chia",
      nombre: "Batido Limón & Chía",
      precio: 3500,
      precioDisplay: "$3.500",
      imagen: "/imagenes/Batido Limón & Chía.jpg",
      descripcion:
        "Hidratante y depurativo, mejora la digestión y ayuda a la sensación de saciedad gracias a la chía.",
      related: ["batido-verde", "batido-tropical", "batido-cremoso"],
    },
    "batido-rojo": {
      id: "batido-rojo",
      nombre: "Batido Rojo Antioxidante",
      precio: 4500,
      precioDisplay: "$4.500",
      imagen: "/imagenes/BATIDO ROJO.jpg",
      descripcion:
        "Potente fuente de antioxidantes que protegen las células, favorecen la circulación y aportan energía natural.",
      related: ["batido-verde", "batido-tropical", "batido-cremoso"],
    },
    "batido-cremoso": {
      id: "batido-cremoso",
      nombre: "Batido Cremoso Detox",
      precio: 4990,
      precioDisplay: "$4.990",
      imagen: "/imagenes/BATIDO CREMOSO.jpg",
      descripcion:
        "Cremoso y saciante. El aguacate aporta grasas saludables y ayuda a mantener energía por más tiempo.",
      related: ["batido-verde", "batido-limon-chia", "batido-rojo"],
    },
    "batido-verde-dulce": {
      id: "batido-verde-dulce",
      nombre: "Batido Verde Dulce",
      precio: 4300,
      precioDisplay: "$4.300",
      imagen: "/imagenes/BATIDO VERDE DULCE.jpg",
      descripcion:
        "Combina lo detox del kale con la dulzura del mango y el plátano, nutritivo y agradable al paladar.",
      related: ["batido-verde", "batido-tropical", "batido-cremoso"],
    },
  };

  // Cargar el producto seleccionado y sus relacionados
  useEffect(() => {
    if (idProducto && productos[idProducto]) {
      setProducto(productos[idProducto]);
      setRelacionados(productos[idProducto].related.map((id) => productos[id]));
    }
  }, [idProducto]);

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

  // --- Función para agregar al carrito ---
  const handleAgregar = () => {
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      quantity: Number(cantidad),
    };
    addToCart(item);
    alert(`${producto.nombre} agregado al carrito (${cantidad} unidad/es)`);
  };

  return (
    <>
      {/* Detalle principal */}
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-6 text-center">
            <Image
              src={producto.imagen}
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
              <span className="fs-5 text-success">
                {producto.precioDisplay}
              </span>
            </div>
            <hr />
            <p>{producto.descripcion}</p>
            <hr />

            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <select
                id="cantidad"
                className="form-select"
                style={{ maxWidth: "120px" }}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
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

      {/* Productos relacionados */}
      <div className="container my-5">
        <h3 className="mb-4 text-center">Productos Relacionados</h3>
        <div className="row g-3 justify-content-center">
          {relacionados.map((rel) => (
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
                  <p className="card-text text-success">{rel.precioDisplay}</p>
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
    </>
  );
}
