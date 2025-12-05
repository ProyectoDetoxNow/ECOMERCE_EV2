"use server";

const API_PAGO =
  "http://https://apipago-production-73a5.up.railway.app/Api/v1/pago/pago";
// Cambia por tu URL real cuando lo subas

// Registrar un pago
export async function registrarPago(data) {
  const res = await fetch(`${API_PAGO}/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al registrar pago");
  return res.json();
}
