"use client";
import Link from "next/link";
import MediosDePago from "./mediosDePago";

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h6 className="text-uppercase text-success">Detox Now</h6>
            <MediosDePago />
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
            <h6 className="text-uppercase">Suscríbete a nuestro Newsletter:</h6>
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Gracias por suscribirte 🌿");
              }}
            >
              <input
                type="email"
                className="form-control me-2"
                placeholder="Ingresar Email"
                required
              />
              <button className="btn btn-dark" type="submit">
                Subscribir
              </button>
            </form>
          </div>
        </div>
        <hr />
        <p className="text-center text-muted small mb-0">
          © {new Date().getFullYear()} DetoxNow | Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
