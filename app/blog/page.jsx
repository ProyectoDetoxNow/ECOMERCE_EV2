"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import ModalCaso from "@/components/ModalCaso";
import { casos } from "@/components/casosData";

export default function BlogPage() {
  const [modalActivo, setModalActivo] = useState(null);
  const casoSeleccionado = casos.find((c) => c.id === modalActivo);

  return (
    <>
      {/* Banner */}
      <div
        className="banner-superior"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      ></div>

      <div className="container my-4">
        <p id="titleB" className="text-center fs-4 mb-4">
          Tu espacio de vida saludable 🌱
        </p>

        <h3 className="mb-4 text-center">Datos Curiosos</h3>

        {casos.map((caso) => (
          <BlogCard key={caso.id} caso={caso} onVerCaso={setModalActivo} />
        ))}

        {/* Video */}
        <section className="container my-5 text-center">
          <h2 className="mb-3">Video destacado</h2>
          <p>
            Mira este video sobre algunos batidos y sus beneficios: ¡cualquiera
            de estos lo tenemos listo para ti!
          </p>
          <div className="ratio ratio-16x9 mx-auto" style={{ maxWidth: "700px" }}>
            <iframe
              src="https://www.youtube.com/embed/VSS0xHCxyDE"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>

      <ModalCaso caso={casoSeleccionado} onCerrar={() => setModalActivo(null)} />
    </>
  );
}
