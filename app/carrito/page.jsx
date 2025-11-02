"use client";
import { useCart } from "@/components/CartContext";

export default function CarritoPage() {
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    changeQuantity,
    removeFromCart,
  } = useCart();

  if (cartItems.length === 0)
    return <p className="text-center mt-5">Tu carrito está vacío 🛒</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">🛒 Tu Carrito ({totalQuantity})</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
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

          <div>${item.precio}</div>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => changeQuantity(item.id, "restar")}
            >
              −
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => changeQuantity(item.id, "sumar")}
            >
              +
            </button>
          </div>

          <div className="text-end">
            <strong>${item.precio * item.quantity}</strong>
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 border-top pt-3">
        <h5>Total: ${totalPrice}</h5>
      </div>
    </div>
  );
}
