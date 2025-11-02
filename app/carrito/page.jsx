"use client";
import useCarrito from "@/components/useCarrito";

export default function CarritoPage() {
  const {
    carrito,
    totales,
    cartCount,
    cambiarCantidad,
    aplicarCupon,
    formatPrice,
  } = useCarrito();

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🛒 Tu Carrito ({cartCount})</h1>

      {carrito.length === 0 ? (
        <p className="text-center text-muted">Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center border-bottom py-2 justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  className="me-3 rounded"
                />
                <div>
                  <strong>{item.nombre}</strong>
                  <br />
                  <small className="text-muted">{item.descripcion}</small>
                </div>
              </div>

              <div>${formatPrice(item.precio)}</div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => cambiarCantidad(index, "restar")}
                >
                  −
                </button>
                <span className="mx-2">{item.cantidad}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => cambiarCantidad(index, "sumar")}
                >
                  +
                </button>
              </div>

              <div className="text-end">
                <strong>${formatPrice(item.precio * item.cantidad)}</strong>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => cambiarCantidad(index, "eliminar")}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <h5>Resumen</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <strong>${formatPrice(totales.subtotal)}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Descuento:</span>
              <strong>
                {totales.descuento > 0
                  ? `-$${formatPrice(totales.descuento)}`
                  : "$0"}
              </strong>
            </div>
            <div className="d-flex justify-content-between border-top pt-2 mt-2">
              <span>Total:</span>
              <strong>${formatPrice(totales.total)}</strong>
            </div>

            <div className="mt-3 d-flex">
              <input
                type="text"
                id="cupon"
                placeholder="Ingresa cupón"
                className="form-control me-2"
              />
              <button
                className="btn btn-success"
                onClick={() =>
                  aplicarCupon(document.getElementById("cupon").value)
                }
              >
                Aplicar cupón
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
