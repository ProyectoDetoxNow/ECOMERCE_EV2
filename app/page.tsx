"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/Banner";

export default function HomePage() {
  return (
    <>
      <Banner titulo="Bienvenidos a DetoxNow" />

      <main className="container py-5 text-center">
        <h2 className="text-success fw-bold mb-3">
          Vive Saludable con DetoxNow
        </h2>
        <p className="lead text-muted">
          Encuentra productos naturales, ecológicos y 100% saludables para mejorar tu bienestar físico y mental.
        </p>
        <Link href="/productos" className="btn btn-success mt-3">
          Ver Productos
        </Link>

        <hr className="my-5" />

        <div className="row g-4">
          {/* Tarjeta 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
<<<<<<< HEAD
              <Image
                src="/imagenes/Producto 1.jpg"
                className="card-img-top"
                alt="Producto 1"
                width={200}
                height={200}
                style={{ marginTop: "20px" }}
              />
=======
              <Col xs={6} md={12}>
                <Image
                  src="/imagenes/Producto 1.jpg"
                  alt="Producto 1"
                  width={300}
                  height={200}
                  className="card-img-top img-fluid rounded"
                  style={{ marginTop: "20px" }}
                />
              </Col>
>>>>>>> main
              <div className="card-body">
                <h5 className="card-title text-success">Jugos Detox</h5>
                <p className="card-text">
                  Refresca tu cuerpo con nuestras mezclas naturales llenas de energía.
                </p>
                <Link href="/productos" className="btn btn-outline-success">
                  Ver más
                </Link>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/imagenes/primera_imag.jpg"
                alt="Producto 2"
<<<<<<< HEAD
                width={200}
                height={200}
=======
                width={300}
                height={200}
                className="card-img-top img-fluid rounded"
>>>>>>> main
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

          {/* Tarjeta 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <Image
                src="/imagenes/primera_imag.jpg"
                alt="Producto 3"
<<<<<<< HEAD
                width={200}
                height={200}
=======
                width={300}
                height={200}
                className="card-img-top img-fluid rounded"
>>>>>>> main
              />
              <div className="card-body">
                <h5 className="card-title text-success">Tés & Infusiones</h5>
                <p className="card-text">
                  Disfruta de nuestros tés relajantes con ingredientes orgánicos.
                </p>
                <Link href="/productos" className="btn btn-outline-success">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
