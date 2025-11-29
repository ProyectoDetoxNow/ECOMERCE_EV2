export async function obtenerInventario() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("No se pudo cargar inventario");
  return res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}
