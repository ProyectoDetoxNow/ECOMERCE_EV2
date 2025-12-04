"use client";

import { useState, useEffect } from "react";
import {
  getCarrito,
  crearOAgregar,
  updateCantidad,
  deleteProducto,
} from "@/services/apiCarrito";

const ID_USUARIO = 1; // Usuario fijo

export default function CarritoPage() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------------------------
  // Cargar carrito si existe en localStorage
  // ----------------------------------------------
  useEffect(() => {
    const idGuardado = localStorage.getItem("idCarrito");

    if (idGuardado) {
      cargarCarrito(idGuardado);
    } else {
      setLoading(false);
    }
  }, []);

  // ----------------------------------------------
  // Función para cargar carrito
  // ----------------------------------------------
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

  // ----------------------------------------------
  // Agregar producto
  // ----------------------------------------------
  const agregarProducto = async (idProducto, cantidad) => {
    try {
      const idCarrito = localStorage.getItem("idCarrito");

      const data = await crearOAgregar(idCarrito, idProducto, cantidad);

      localStorage.setItem("idCarrito", data.id);

      setCarrito(data);
    } catch (err) {
      setError("Error agregando producto");
    }
  };

  // ----------------------------------------------
  // Actualizar cantidad
  // ----------------------------------------------
  const actualizarCantidad = async (idProducto, cantidad) => {
    if (!carrito) return;

    await updateCantidad(carrito.id, idProducto, cantidad);

    cargarCarrito(carrito.id);
  };

  // ----------------------------------------------
  // Eliminar producto
  // ----------------------------------------------
  const eliminarProducto = async (idProducto) => {
    if (!carrito) return;

    await deleteProducto(carrito.id, idProducto);

    cargarCarrito(carrito.id);
  };

  // ----------------------------------------------
  // LOADING & ERROR
  // ----------------------------------------------
  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  // ----------------------------------------------
  // RENDER
  // ----------------------------------------------
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
              <div>
                <strong>Producto ID: {item.idProducto}</strong>
                <br />
                Cantidad: {item.cantidad}
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

          <div className="list-group-item fw-bold d-flex justify-content-between">
            Total:
            <span>${carrito.total}</span>
          </div>

          <a href="/pago" className="btn btn-success mt-3">
            Ir a pagar
          </a>
        </div>
      )}
    </div>
  );
}
