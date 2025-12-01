"use server";

const API_PAGO = "http://localhost:8082/pago";
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
