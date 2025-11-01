"use client";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function Nosotros() {
  // Activamos Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      {/* Banner superior */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-center"
        style={{
          background:
            'url("/imagenes/primera_imag.jpg") center/cover no-repeat',
          height: "300px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="fw-bold">Conoce más sobre nosotros</h1>
      </div>

      {/* Navbar */}
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

            {/* Carrito */}
            <Link href="/carrito" className="btn btn-outline-success">
              🛒 <span className="badge bg-warning text-dark">0</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login / Registro */}
      <div className="container">
        <nav className="d-flex justify-content-end p-3">
          <Link className="text-success me-2" href="/login">
            Iniciar sesión
          </Link>
          <span className="text-success me-2">|</span>
          <Link className="text-success me-2" href="/registro">
            Registro
          </Link>
        </nav>
      </div>

      {/* SOBRE NOSOTROS */}
      <section className="container mt-5 mb-5" id="empresa">
        <h1
          className="text-center mb-5"
          style={{ fontFamily: "Story Script", fontSize: "48px" }}
        >
          Sobre Detox Now
        </h1>
        <div className="row align-items-center">
          {/* Texto */}
          <div className="col-md-6">
            <p>
              <strong>Detox Now</strong> cree que la salud y el bienestar
              comienzan desde adentro. Somos una empresa dedicada a ofrecer
              insumos naturales, frescos y congelados, listos para preparar
              batidos desintoxicantes con frutas y verduras de la mejor calidad.
              Solo necesitas agregar un poco de agua y licuar para disfrutar de
              un batido delicioso y nutritivo.
            </p>
          </div>

          {/* Carrusel */}
          <div className="col-md-6">
            <div
              id="carouselEmpresa"
              className="carousel slide shadow rounded"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Image
                    src="/imagenes/descripcion 1.jpg"
                    alt="Imagen 1"
                    width={600}
                    height={400}
                    className="d-block mx-auto rounded"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                </div>
                <div className="carousel-item">
                  <Image
                    src="/imagenes/descripcion 2.jpg"
                    alt="Imagen 2"
                    width={600}
                    height={400}
                    className="d-block mx-auto rounded"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                </div>
                <div className="carousel-item">
                  <Image
                    src="/imagenes/descripcion 3.jpg"
                    alt="Imagen 3"
                    width={600}
                    height={400}
                    className="d-block mx-auto rounded"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselEmpresa"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselEmpresa"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="container mt-5 mb-5" id="mision">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-1">
            <h2
              className="mb-4"
              style={{
                fontFamily: "Story Script",
                fontSize: "46px",
                textAlign: "left",
              }}
            >
              Nuestra Misión
            </h2>
            <p>
              En <strong>Detox Now</strong> nos esforzamos por ofrecer productos
              naturales y congelados de la mejor calidad, listos para preparar
              batidos saludables que faciliten un estilo de vida equilibrado.
              Queremos que nuestros clientes disfruten de la practicidad sin
              sacrificar el sabor ni los beneficios nutricionales, promoviendo
              hábitos alimenticios conscientes y sostenibles.
            </p>
          </div>
          <div className="col-md-6 order-md-2 text-center">
            <Image
              src="/imagenes/Detox Now logo.png"
              alt="Nuestra Misión"
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        </div>
      </section>
    </>
  );
}
