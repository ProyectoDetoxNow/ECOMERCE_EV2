"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCarrito } from "@/services/apiCarrito";

export default function PagoPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const [carrito, setCarrito] = useState(null);
  const [cargandoCarrito, setCargandoCarrito] = useState(true);
  const [errorCarrito, setErrorCarrito] = useState("");
  const [pagando, setPagando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // --------------------------------------------------------
  // 1️⃣ Verificar sesión + Autocompletar datos + cargar carrito
  // --------------------------------------------------------
  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (!usuarioActivo) {
      router.push("/login");
      return;
    }

    // Autocompletar desde localStorage
    setCorreo(usuarioActivo);
    setNombre(localStorage.getItem("nombreUsuario") || "");
    setDireccion(localStorage.getItem("direccionUsuario") || "");

    const idCarrito = localStorage.getItem("idCarrito");

    if (!idCarrito) {
      setErrorCarrito("No hay carrito para pagar.");
      setCargandoCarrito(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await getCarrito(idCarrito);
        setCarrito(data);
      } catch (err) {
        console.error(err);
        setErrorCarrito("No se pudo cargar el carrito.");
      } finally {
        setCargandoCarrito(false);
      }
    };

    cargar();
  }, [router]);

  // --------------------------------------------------------
  // Calcular total del carrito
  // --------------------------------------------------------
  const calcularTotal = () => {
    if (!carrito || !carrito.detalles) return 0;
    return carrito.detalles.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      return acc + precio * item.cantidad;
    }, 0);
  };

  // --------------------------------------------------------
  // 2️⃣ Procesar el pago
  // --------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pagando) return;

    setPagando(true);
    setMensajeExito("");

    const idCarrito = localStorage.getItem("idCarrito");
    const idUsuario = Number(localStorage.getItem("idUsuario") || 1);

    try {
      // Crear pedido
      const resPedido = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/crear/${idCarrito}/${idUsuario}`,
        { method: "POST" }
      );

      if (!resPedido.ok) throw new Error("No se pudo crear el pedido");

      const pedido = await resPedido.json();

      // Registrar pago
      const resPago = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/pagar/${pedido.id}?metodoPago=${metodoPago}`,
        { method: "POST" }
      );

      if (!resPago.ok) throw new Error("Error procesando pago");

      // Éxito
      setMensajeExito(`Gracias por tu compra, ${nombre}. ¡Pago exitoso!`);

      localStorage.removeItem("idCarrito");
      window.dispatchEvent(new Event("carritoActualizado"));
    } catch (err) {
      console.error(err);
      alert("Hubo un error procesando tu pago.");
    } finally {
      setPagando(false);
    }
  };

  const total = calcularTotal();

  return (
    <>
      {/* Banner */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Pago Seguro</h1>
      </div>

      <div className="container my-5">
        <div className="row">
          {/* ------------------------------------------------------
              FORMULARIO DE PAGO
          ------------------------------------------------------ */}
          <div className="col-md-6 mb-4">
            <h2 className="text-center mb-4">Formulario de Pago</h2>

            <form
              className="shadow p-4 rounded bg-light"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección de envío</label>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Método de Pago</label>
                <select
                  className="form-select"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  required
                >
                  <option value="">Selecciona un método</option>
                  <option value="tarjeta">Tarjeta de crédito</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={pagando || cargandoCarrito || !!errorCarrito}
              >
                {pagando ? "Procesando pago..." : "Pagar"}
              </button>

              {mensajeExito && (
                <div className="alert alert-success mt-3">{mensajeExito}</div>
              )}
            </form>
          </div>

          {/* ------------------------------------------------------
              RESUMEN DE LA COMPRA
          ------------------------------------------------------ */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">Resumen de tu compra</h2>

            {cargandoCarrito && (
              <p className="text-center">Cargando carrito...</p>
            )}

            {errorCarrito && (
              <div className="alert alert-danger text-center">
                {errorCarrito}
              </div>
            )}

            {!cargandoCarrito && carrito && carrito.detalles && (
              <div className="card shadow">
                <div className="card-body">
                  {carrito.detalles.length > 0 ? (
                    <>
                      {carrito.detalles.map((item) => (
                        <div
                          key={item.idProducto}
                          className="d-flex justify-content-between mb-2"
                        >
                          <div>
                            <strong>{item.producto?.nombreProducto}</strong>
                            <div className="text-muted">
                              {item.cantidad} x ${item.producto?.precio}
                            </div>
                          </div>
                          <span className="fw-bold">
                            ${item.cantidad * (item.producto?.precio || 0)}
                          </span>
                        </div>
                      ))}

                      <hr />

                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <span>${total}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-center">
                      Tu carrito está vacío.{" "}
                      <Link href="/productos">Ver productos</Link>
                    </p>
                  )}
                </div>
              </div>
            )}

            <Link
              href="/carrito"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
