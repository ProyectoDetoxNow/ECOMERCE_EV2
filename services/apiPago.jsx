// services/apiPago.js

const API_PAGO = "https://apipago-production-73a5.up.railway.app/Api/v1/pago";

/**
 * Crear un pedido a partir del carrito
 */
export async function crearPedido(idCarrito, idUsuario) {
  const res = await fetch(
    `${API_PAGO}/pedido/crear/${idCarrito}/${idUsuario}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Error al crear el pedido");
  }

  return res.json();
}

/**
 * Pagar un pedido existente
 */
export async function pagarPedido(pedidoId, metodoPago) {
  const res = await fetch(
    `${API_PAGO}/pedido/pagar/${pedidoId}?metodoPago=${metodoPago}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Error procesando el pago");
  }
}
