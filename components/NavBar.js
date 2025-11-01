"use client";
import { useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  useEffect(() => {
    // Cargamos el JS de Bootstrap solo en el cliente
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <div className="text-center py-3 bg-light">
        <h1 className="display-4 fw-bold text-success">
          Bienvenido a DetoxNow
        </h1>
      </div>

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
            aria-controls="menuNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
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

            <div className="d-flex align-items-center">
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
    </>
  );
}
