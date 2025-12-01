"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBarDetox() {
  const { totalQuantity } = useCart();

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
              Categorias
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
            <Link href="/login" className="text-success text-decoration-none">
              Iniciar sesión
            </Link>
            <span className="text-success fw-bold">|</span>
            <Link
              href="/registro"
              className="text-success text-decoration-none"
            >
              Registro
            </Link>

            <Link
              href="/carrito"
              className="btn btn-outline-success position-relative px-3"
            >
              🛒
              {totalQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
