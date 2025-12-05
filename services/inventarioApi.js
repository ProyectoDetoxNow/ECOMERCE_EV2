// services/inventarioApi.js

export async function obtenerInventario() {
  const res = await fetch(
    "https://apiproducto-production.up.railway.app/Api/v1/inventario",
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Error al obtener inventario");
    return [];
  }

  return res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(
    `https://apiproducto-production.up.railway.app/Api/v1/inventario/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Error al obtener producto por ID");
    return null;
  }

  return res.json();
}
