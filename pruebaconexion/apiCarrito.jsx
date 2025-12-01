// pruebaconexion/apiCarrito.jsx
const API_URL =
  "https://apicarrito-production-xxxx.up.railway.app/Api/v1/Carrito";

export const getCarrito = async (idCarrito) => {
  const res = await fetch(`${API_URL}/${idCarrito}`);
  if (!res.ok) throw new Error("No se pudo cargar el carrito");
  return res.json();
};

export const crearOAgregar = async (idUsuario, idProducto, cantidad) => {
  const res = await fetch(
    `${API_URL}/agregar/${idUsuario}/${idProducto}/${cantidad}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Error agregando producto");
  return res.json();
};

export const updateCantidad = async (idCarrito, idProducto, cantidad) => {
  const res = await fetch(`${API_URL}/${idCarrito}/producto/${idProducto}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error("Error actualizando cantidad");
  return res.json();
};

export const deleteProducto = async (idCarrito, idProducto) => {
  const res = await fetch(`${API_URL}/${idCarrito}/producto/${idProducto}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error eliminando producto");
  return res.json();
};
