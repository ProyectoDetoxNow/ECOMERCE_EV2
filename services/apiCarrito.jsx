const API_URL =
  "https://apicarrito-production-1136.up.railway.app/Api/v1/Carrito";

// Obtener carrito
export const getCarrito = async (idCarrito) => {
  const res = await fetch(`${API_URL}/${idCarrito}`);
  if (!res.ok) throw new Error("No se pudo cargar el carrito");
  return res.json();
};

// Crear carrito o agregar producto
export const crearOAgregar = async (idCarrito, idProducto, cantidad) => {
  const carritoId = idCarrito ?? 0;

  const res = await fetch(
    `${API_URL}/agregar/${carritoId}/${idProducto}/${cantidad}`,
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
