"use client";

import Link from "next/link";
import ProductosList from "../../components/productosList";
import Banner from "@/components/Banner";

export default function ProductosPage() {
  return (
    <>
      <Banner titulo="Nuestros productos" />

      {/* Enlaces de login / registro */}
      <div className="container">
        <nav className="d-flex justify-content-end p-3">
          <Link href="/login" className="nav-link text-success me-2">
            Iniciar sesión
          </Link>
          <span className="text-success me-2">|</span>
          <Link href="/registro" className="nav-link text-success me-2">
            Registro
          </Link>
        </nav>
      </div>

      {/* Título */}
      <h1
        className="text-center my-4"
        style={{ fontFamily: "Story Script, cursive" }}
      >
        Productos
      </h1>

      {/* Componente de listado */}
      <ProductosList />
    </>
  );
}
