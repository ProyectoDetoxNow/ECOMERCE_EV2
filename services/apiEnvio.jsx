export async function calcularEnvio(datosEnvio) {
  const res = await fetch(
    "https://apipago-production-73a5.up.railway.app/api/pago/calcular-envio",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEnvio),
    }
  );

  if (!res.ok) {
    throw new Error("Error al calcular envío");
  }

  return res.json();
}
