// components/BotonAgregarCarrito.js
"use client";

import useCarrito from "@/components/useCarrito";

export default function BotonAgregarCarrito({ producto, cantidad = 1, className = "" }) {
  const { agregarProducto } = useCarrito();

  const handleAgregar = () => {
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      cantidad: Number(cantidad),
    };

    agregarProducto(item);
    alert(`${producto.nombre} agregado al carrito (${cantidad} unidad/es)`);
  };

  return (
    <button onClick={handleAgregar} className={`btn btn-success ${className}`}>
      <i className="bi bi-cart-plus"></i> Agregar al Carrito{al className.includes('btn-lg') ? ' al carrito' : ''}
    </button>
  );
}