"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function DetalleProductoPage() {
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("producto");
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);

  // Datos de productos
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

  // Carga el producto y sus relacionados
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

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow p-2">
        <div className="container">
          <Link href="/" className="navbar-brand text-success fw-bold">
            DetoxNow
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="menuNavbar"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link text-success">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/productos" className="nav-link text-success">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/nosotros" className="nav-link text-success">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog" className="nav-link text-success">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contacto" className="nav-link text-success">
                  Contacto
                </Link>
              </li>
            </ul>

            <Link href="/carrito" className="btn btn-outline-success">
              🛒 <span className="badge bg-warning text-dark">0</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Detalle del producto */}
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
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-success btn-lg">
              <i className="bi bi-cart-plus"></i> Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="container my-5">
        <h3 className="mb-4 text-center">Productos Relacionados</h3>
        <div className="row g-3">
          {relacionados.map((rel) => (
            <div key={rel.id} className="col-md-4">
              <div className="card shadow h-100">
                <Image
                  src={rel.imagen}
                  alt={rel.nombre}
                  width={400}
                  height={300}
                  className="card-img-prod"
                  style={{
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                    width: "70%",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{rel.nombre}</h5>
                  <p className="card-text">{rel.precioDisplay}</p>
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
