"use client";

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export default function NavBarDetox() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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
          <div className="d-flex align-items-center gap-3">
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
            <Nav.Link
              as={Link}
              href="/carrito"
              className="btn btn-outline-success px-3"
            >
              🛒 <span className="badge bg-warning text-dark">0</span>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
