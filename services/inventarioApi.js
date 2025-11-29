export async function obtenerInventario() {
  const res = await fetch(
    "https://apiproducto.up.railway.app/Api/v1/inventario",
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Error al obtener inventario");
    return [];
  }

  return res.json();
}
