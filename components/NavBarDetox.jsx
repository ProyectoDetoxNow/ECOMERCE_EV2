"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export default function NavBarDetox() {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    const updateCartCount = () => {
      try {
        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
        const total = carrito.reduce(
          (sum, item) => sum + Number(item.cantidad || 0),
          0
        );
        setTotalQuantity(total);
      } catch {
        setTotalQuantity(0);
      }
    };

    // Actualizar al cargar
    updateCartCount();

    // Escuchar cambios en el carrito (desde otras pestañas o actualizaciones)
    const handleStorage = (e) => {
      if (e.key === "carrito") updateCartCount();
    };
    window.addEventListener("storage", handleStorage);

    // Limpieza
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm bg-light py-3">
      <Container>
        {/* 🔹 Logo o marca */}
        <Link href="/" className="navbar-brand fw-bold text-success fs-4">
          DetoxNow
        </Link>

        {/* 🔹 Botón toggle (modo móvil) */}
        <Navbar.Toggle aria-controls="menu-principal" />

        {/* 🔹 Enlaces del menú */}
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto d-flex align-items-center">
            <Nav.Link as={Link} href="/" className="text-success fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/productos"
              className="text-success fw-semibold"
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/nosotros"
              className="text-success fw-semibold"
            >
              Nosotros
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/blog"
              className="text-success fw-semibold"
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/contacto"
              className="text-success fw-semibold"
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* 🔹 Acciones a la derecha */}
          <div className="d-flex align-items-center gap-3 position-relative">
            <Nav.Link
              as={Link}
              href="/login"
              className="text-success text-decoration-none"
            >
              Iniciar sesión
            </Nav.Link>
            <span className="text-success fw-bold">|</span>
            <Nav.Link
              as={Link}
              href="/registro"
              className="text-success text-decoration-none"
            >
              Registro
            </Nav.Link>

            {/* 🛒 Carrito con contador */}
            <div className="position-relative">
              <Nav.Link
                as={Link}
                href="/carrito"
                className="btn btn-outline-success px-3 position-relative"
              >
                🛒
                {totalQuantity > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </Nav.Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
