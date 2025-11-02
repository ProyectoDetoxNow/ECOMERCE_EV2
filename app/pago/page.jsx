"use client";

import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function PagoPage() {
  const { cartItems, totalPrice } = useCart();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Gracias por tu compra, ${nombre} ${apellidos}!\nTotal a pagar: $${totalPrice}`
    );
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

      {/* Formulario y Resumen del carrito */}
      <div className="container my-5">
        <div className="row">
          {/* Formulario de pago */}
          <div className="col-md-6 mb-4">
            <h2 className="text-center mb-4">Formulario de Pago</h2>
            <form
              className="shadow p-4 rounded bg-light"
              onSubmit={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    className="form-control"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="metodoPago" className="form-label">
                  Método de Pago
                </label>
                <select
                  id="metodoPago"
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

          {/* Resumen del carrito */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">Resumen de tu compra</h2>
            {cartItems.length === 0 ? (
              <p className="text-center">Tu carrito está vacío 🛒</p>
            ) : (
              <div className="list-group">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.nombre}</strong> <br />
                      Cantidad: {item.quantity || item.cantidad}
                    </div>
                    <span>
                      $
                      {(
                        item.precio * (item.quantity || item.cantidad)
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                  Total:
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
