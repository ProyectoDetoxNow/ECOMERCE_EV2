"use client";

export default function BotonAgregarCarrito({ producto, className = "" }) {
  const API_URL =
    "https://apicarrito-production-1136.up.railway.app/Api/v1/Carrito"; // 🔥 Cambia por tu URL real

  const ID_USUARIO = 1; // Usuario fijo temporal

  const handleAgregar = async () => {
    try {
      const res = await fetch(
        `${API_URL}/agregar/${ID_USUARIO}/${producto.id}/1`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Error al agregar");

      const data = await res.json();

      // Guardar id del carrito para seguir usando
      localStorage.setItem("idCarrito", data.id);

      alert(`${producto.nombre} agregado al carrito 🛒`);
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar al carrito");
    }
  };

  return (
    <button onClick={handleAgregar} className={`btn btn-success ${className}`}>
      <i className="bi bi-cart-plus"></i> Agregar al carrito
    </button>
  );
}
