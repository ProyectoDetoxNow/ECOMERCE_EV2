"use client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/esm/Col";
import MediosDePago from "../components/mediosDePago";

export default function HomePage() {
  return (
    <>
      {/* 🔹 Banner superior */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-4 fw-bold">Bienvenido a DetoxNow 🌿</h1>
      </div>

      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow p-2">
        <div className="container">
          <Link className="navbar-brand text-success fw-bold" href="/">
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
                <Link className="nav-link text-success" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success" href="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success" href="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success" href="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-success" href="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>

            <div>
              <Link
                href="/login"
                className="text-success me-3 text-decoration-none"
              >
                Iniciar sesión
              </Link>
              <span className="text-success me-3">|</span>
              <Link
                href="/registro"
                className="text-success text-decoration-none me-4"
              >
                Registro
              </Link>
              <Link href="/carrito" className="btn btn-outline-success">
                🛒 <span className="badge bg-warning text-dark">0</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Contenido principal */}
      <main className="container py-5 text-center">
        <h2 className="text-success fw-bold mb-3">
          Vive Saludable con DetoxNow
        </h2>
        <p className="lead text-muted">
          Encuentra productos naturales, ecológicos y 100% saludables para
          mejorar tu bienestar físico y mental.
        </p>
        <Link href="/productos" className="btn btn-success mt-3">
          Ver Productos
        </Link>

        <hr className="my-5" />

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Col xs={6} md={4}>
                <Image
                  src="/imagenes/Producto 1.jpg"
                  className="card-img-top"
                  alt="Producto 1"
                  width={200}
                  height={200}
                  style={{ marginTop: "20px" }}
                />
              </Col>

              <div className="card-body">
                <h5 className="card-title text-success">Jugos Detox</h5>
                <p className="card-text">
                  Refresca tu cuerpo con nuestras mezclas naturales llenas de
                  energía.
                </p>
                <Link href="/productos" className="btn btn-outline-success">
                  Ver más
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="/imagenes/primera_imag.jpg"
                className="card-img-top"
                alt="Producto 2"
              />
              <div className="card-body">
                <h5 className="card-title text-success">Snacks Saludables</h5>
                <p className="card-text">
                  Snacks sin azúcar, sin gluten y llenos de sabor natural.
                </p>
                <Link href="/productos" className="btn btn-outline-success">
                  Ver más
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src="/imagenes/primera_imag.jpg"
                className="card-img-top"
                alt="Producto 3"
              />
              <div className="card-body">
                <h5 className="card-title text-success">Tés & Infusiones</h5>
                <p className="card-text">
                  Disfruta de nuestros tés relajantes con ingredientes
                  orgánicos.
                </p>
                <Link href="/productos" className="btn btn-outline-success">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-light border-top mt-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h6 className="text-uppercase text-success">Detox Now</h6>
              <div className="d-flex gap-2 mt-2">
                <MediosDePago />
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
                Suscríbete a nuestro Newsletter:
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
