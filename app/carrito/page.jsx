"use client";

import { useState, useEffect } from "react";
import {
  getCarrito,
  crearOAgregar,
  updateCantidad,
  deleteProducto,
} from "@/services/apiCarrito";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------------------------------
  // Cargar carrito desde localStorage
  // ----------------------------------------------------
  useEffect(() => {
    const idGuardado = Number(localStorage.getItem("idCarrito"));

    if (idGuardado && idGuardado > 0) {
      cargarCarrito(idGuardado);
    } else {
      setLoading(false);
    }
  }, []);

  // ----------------------------------------------------
  const cargarCarrito = async (idCarrito) => {
    try {
      const data = await getCarrito(idCarrito);
      setCarrito(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  const actualizarCantidad = async (idProducto, cantidad) => {
    if (!carrito) return;

    await updateCantidad(carrito.id, idProducto, cantidad);
    cargarCarrito(carrito.id);
  };

  // ----------------------------------------------------
  const eliminarProducto = async (idProducto) => {
    if (!carrito) return;

    await deleteProducto(carrito.id, idProducto);
    cargarCarrito(carrito.id);
  };

  // ----------------------------------------------------
  // CALCULAR TOTAL CORRECTO USANDO EL PRODUCTO DEL BACKEND
  // ----------------------------------------------------
  const calcularTotal = () => {
    if (!carrito) return 0;

    return carrito.detalles.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      return acc + precio * item.cantidad;
    }, 0);
  };

  // ----------------------------------------------------
  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  // ----------------------------------------------------
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Mi Carrito 🛒</h1>

      {!carrito || carrito.detalles.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="list-group">
          {carrito.detalles.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-3">
                {/* Imagen */}
                {item.producto?.imagen && (
                  <img
                    src={item.producto.imagen}
                    alt={item.producto.nombreProducto}
                    width="80"
                    className="rounded"
                  />
                )}

                <div>
                  <strong>{item.producto?.nombreProducto}</strong>
                  <br />
                  <span className="text-muted">
                    Precio unidad: ${item.producto?.precio}
                  </span>
                  <br />
                  <span className="fw-bold">
                    Subtotal: ${item.producto?.precio * item.cantidad}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    actualizarCantidad(item.idProducto, item.cantidad + 1)
                  }
                >
                  +
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    item.cantidad > 1 &&
                    actualizarCantidad(item.idProducto, item.cantidad - 1)
                  }
                >
                  -
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => eliminarProducto(item.idProducto)}
                >
                  X
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="list-group-item fw-bold d-flex justify-content-between">
            Total:
            <span>${calcularTotal()}</span>
          </div>

          <a href="/pago" className="btn btn-success mt-3">
            Ir a pagar
          </a>
        </div>
      )}
    </div>
  );
}
