"use client";

import { useState } from "react";
import Link from "next/link";

export default function PagoPage() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  // ⚠️ Ya no usamos cartContext: el backend calcula el total desde el carrito real.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const idCarrito = localStorage.getItem("idCarrito");
    const usuarioActivo = localStorage.getItem("usuarioActivo") ?? 1;
    const idUsuario = Number(usuarioActivo);

    if (!idCarrito) {
      alert("No existe un carrito para pagar.");
      return;
    }

    try {
      // ---------------------------------------------
      // 1️⃣ CREAR PEDIDO
      // ---------------------------------------------
      const resPedido = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/crear/${idCarrito}/${idUsuario}`,
        { method: "POST" }
      );

      if (!resPedido.ok) throw new Error("No se pudo crear el pedido");

      const pedido = await resPedido.json();

      // ---------------------------------------------
      // 2️⃣ PAGAR PEDIDO
      // ---------------------------------------------
      const resPago = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/pagar/${pedido.id}?metodoPago=${metodoPago}`,
        { method: "POST" }
      );

      if (!resPago.ok) throw new Error("Error procesando el pago");

      alert(
        `Gracias por tu compra, ${nombre} ${apellidos}!\nTu pago fue procesado correctamente.`
      );

      // Limpia carrito al finalizar pago
      localStorage.removeItem("idCarrito");
    } catch (err) {
      alert("Hubo un error procesando tu pago.");
      console.error(err);
    }
  };

  return (
    <>
      {/* Banner */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Pago Seguro</h1>
      </div>

      <div className="container my-5">
        <div className="row">
          {/* FORMULARIO */}
          <div className="col-md-6 mb-4">
            <h2 className="text-center mb-4">Formulario de Pago</h2>

            <form
              className="shadow p-4 rounded bg-light"
              onSubmit={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="col">
                  <label className="form-label">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Método de Pago</label>
                <select
                  className="form-select"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  required
                >
                  <option value="">Selecciona un método</option>
                  <option value="tarjeta">Tarjeta de crédito</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Pagar
              </button>
            </form>
          </div>

          {/* RESUMEN SIMPLE */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">Resumen de tu compra</h2>

            <p className="text-center text-muted">
              El total se calculará automáticamente según tu carrito real.
            </p>

            <Link
              href="/carrito"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
