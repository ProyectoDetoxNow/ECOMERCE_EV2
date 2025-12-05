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
  const [actionLoading, setActionLoading] = useState(false); // evita spam de clicks

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
  // OPTIMISTIC UPDATE: actualizar al instante y luego el backend
  // ----------------------------------------------------
  const actualizarCantidad = async (idProducto, nuevaCantidad) => {
    if (!carrito || actionLoading) return;
    setActionLoading(true);

    // Copia carrito actual
    const copiaCarrito = { ...carrito };
    const copiaDetalles = [...carrito.detalles];

    // Busca el producto y actualiza cantidad en UI
    const index = copiaDetalles.findIndex((d) => d.idProducto === idProducto);
    copiaDetalles[index] = {
      ...copiaDetalles[index],
      cantidad: nuevaCantidad,
    };

    // Se refleja de inmediato
    setCarrito({ ...copiaCarrito, detalles: copiaDetalles });

    try {
      await updateCantidad(carrito.id, idProducto, nuevaCantidad);
    } catch (err) {
      console.error("Error actualizando, revirtiendo", err);

      // Revertir cambios si falla
      setCarrito(copiaCarrito);
    }

    setActionLoading(false);
  };

  // ----------------------------------------------------
  // OPTIMISTIC DELETE: eliminar instantáneamente
  // ----------------------------------------------------
  const eliminarProducto = async (idProducto) => {
    if (!carrito || actionLoading) return;
    setActionLoading(true);

    const copiaCarrito = { ...carrito };
    const copiaDetalles = carrito.detalles.filter(
      (d) => d.idProducto !== idProducto
    );

    // UI refleja la eliminación
    setCarrito({ ...carrito, detalles: copiaDetalles });

    try {
      await deleteProducto(carrito.id, idProducto);
    } catch (err) {
      console.error("Error eliminando, revirtiendo", err);
      setCarrito(copiaCarrito); // revertir
    }

    setActionLoading(false);
  };

  // ----------------------------------------------------
  // CALCULAR TOTAL NUEVO
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
              key={item.idProducto}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-3">
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
                {/* + */}
                <button
                  disabled={actionLoading}
                  className="btn btn-secondary"
                  onClick={() =>
                    actualizarCantidad(item.idProducto, item.cantidad + 1)
                  }
                >
                  +
                </button>

                {/* - */}
                <button
                  disabled={actionLoading}
                  className="btn btn-secondary"
                  onClick={() =>
                    item.cantidad > 1 &&
                    actualizarCantidad(item.idProducto, item.cantidad - 1)
                  }
                >
                  -
                </button>

                {/* Eliminar */}
                <button
                  disabled={actionLoading}
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
