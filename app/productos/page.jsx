"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import Image from "next/image";

export default function ProductosPage() {
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
    <>
      {/* Banner superior */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Nuestros Productos</h1>
      </div>

      {/* Enlaces de login / registro */}
      <div className="container">
        <nav className="d-flex justify-content-end p-3">
          <Link href="/login" className="nav-link text-success me-2">
            Iniciar sesión
          </Link>
          <span className="text-success me-2">|</span>
          <Link href="/registro" className="nav-link text-success me-2">
            Registro
          </Link>
        </nav>
      </div>

      {/* Título */}
      <h1
        className="text-center my-4"
        style={{ fontFamily: "Story Script, cursive" }}
      >
        Productos
      </h1>

      {/* Listado de productos */}
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

      {/* Footer */}
      <footer className="bg-light border-top mt-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h6 className="text-uppercase text-success">Detox Now</h6>
              <div className="d-flex gap-2 mt-2">
                <Image
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                  width={40}
                  height={40}
                />
                <Image
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  alt="Mastercard"
                  width={40}
                  height={40}
                />
                <Image
                  src="https://img.icons8.com/ios-filled/48/000000/paypal.png"
                  alt="PayPal"
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <h6 className="text-uppercase">Categorías</h6>
              <ul className="list-unstyled">
                <li>
                  <Link href="#" className="text-decoration-none text-dark">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none text-dark">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-decoration-none text-dark"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-5 mb-3">
              <h6 className="text-uppercase">
                Suscríbete a nuestro Newsletter
              </h6>
              <form className="d-flex">
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Ingresar Email"
                />
                <button className="btn btn-dark" type="submit">
                  Subscribir
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
