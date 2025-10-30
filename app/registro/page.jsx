"use client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/esm/Col";

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

      {/* 🔹 Footer */}
      <footer className="bg-light border-top mt-5">
        <div className="container py-4">
          <div className="row">
            {/* <div className="col-md-3 mb-3">
              <h6 className="text-uppercase text-success">Detox Now</h6>
              <div className="d-flex gap-2 mt-2">
                <Image
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  className="card-img-top"
                  alt="Visa"
                  width={40}
                  height={40}
                  style={{ marginTop: "10px" }}
                />

                <Image
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  className="card-img-png"
                  alt="Mastercard"
                  width={40}
                  height={40}
                  style={{ marginTop: "10px" }}
                />
                <Image
                  src="https://img.icons8.com/ios-filled/48/000000/paypal.png"
                  className="card-img-png"
                  alt="PayPal"
                  width={40}
                  height={40}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div> */}

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
