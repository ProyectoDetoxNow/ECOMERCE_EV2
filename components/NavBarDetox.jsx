"use client";
import { useState, useEffect } from "react";
import useSesion from "@/hooks/useSesion";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getCarrito } from "@/services/apiCarrito";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBarDetox() {
  const [totalCantidad, setTotalCantidad] = useState(0);
  const { usuario, cerrarSesion } = useSesion();

  // 🔥 Cargar cantidad real desde el backend
  const actualizarCantidadCarrito = async () => {
    try {
      const id = localStorage.getItem("idCarrito");

      if (!id) {
        setTotalCantidad(0);
        return;
      }

      const carrito = await getCarrito(id);

      const cantidad = carrito.detalles?.reduce(
        (acc, item) => acc + item.cantidad,
        0
      );

      setTotalCantidad(cantidad);
    } catch (error) {
      console.error("Error obteniendo carrito:", error);
    }
  };

  // Cargar al entrar a la página
  useEffect(() => {
    actualizarCantidadCarrito();
  }, []);

  // 🔥 Escuchar cambios de carrito enviados desde el botón
  useEffect(() => {
    window.addEventListener("carritoActualizado", actualizarCantidadCarrito);

    return () =>
      window.removeEventListener(
        "carritoActualizado",
        actualizarCantidadCarrito
      );
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm bg-light py-3">
      <Container>
        <Link href="/" className="navbar-brand fw-bold text-success fs-4">
          DetoxNow
        </Link>

        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
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
              href="/categorias"
              className="text-success fw-semibold"
            >
              Categorías
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

          <div className="d-flex align-items-center gap-3">
            {usuario ? (
              <>
                <span className="text-success fw-bold">{usuario}</span>
                <button
                  onClick={cerrarSesion}
                  className="btn btn-outline-danger btn-sm"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-success text-decoration-none"
                >
                  Iniciar sesión
                </Link>
                <span className="text-success fw-bold">|</span>
                <Link
                  href="/registro"
                  className="text-success text-decoration-none"
                >
                  Registro
                </Link>
              </>
            )}

            {/* 🔥 Ícono del carrito con cantidad REAL */}
            <Link
              href="/carrito"
              className="btn btn-outline-success position-relative px-3"
              style={{ fontSize: "1.4rem" }}
            >
              🛒
              {totalCantidad > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.35rem 0.5rem",
                    minWidth: "1.4rem",
                    height: "1.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalCantidad}
                </span>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
