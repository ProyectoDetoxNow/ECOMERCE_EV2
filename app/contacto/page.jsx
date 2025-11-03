"use client";

import useContactoForm from "../../components/useContactoForm";

export default function ContactoPage() {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    asunto,
    setAsunto,
    mensaje,
    contadorMensaje,
    handleMensajeChange,
    handleSubmit,
  } = useContactoForm();

  return (
    <>
      {/* Banner */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="display-5 fw-bold">Contáctanos</h1>
      </div>

      {/* Contenido */}
      <div className="container my-5">
        <div className="row">
          {/* Formulario */}
          <div className="col-md-6 mb-4">
            <h2>Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="asunto" className="form-label">
                  Asunto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="asunto"
                  placeholder="Motivo de tu mensaje"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  value={mensaje}
                  onChange={handleMensajeChange}
                  required
                ></textarea>
                <small
                  className={`form-text ${
                    contadorMensaje > 500 ? "text-danger" : "text-muted"
                  }`}
                >
                  {contadorMensaje} / 500 caracteres
                </small>
              </div>
              <button type="submit" className="btn btn-success">
                Enviar
              </button>
            </form>
          </div>

          {/* Mapa */}
          <div className="col-md-6 mb-4">
            <h2>Nuestra ubicación</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d831.606797199873!2d-70.59917658344513!3d-33.51627726933762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2scl!4v1758071554549!5m2!1ses!2scl"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
