"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCarrito } from "@/services/apiCarrito";
import { calcularEnvio } from "@/services/apiEnvio";

export default function PagoPage() {
  const router = useRouter();

  // -------------------------------
  // Datos usuario / formulario
  // -------------------------------
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [region, setRegion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  // -------------------------------
  // Estados de envío
  // -------------------------------
  const [envio, setEnvio] = useState(null);
  const [calculandoEnvio, setCalculandoEnvio] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  // -------------------------------
  // Estados carrito / pago
  // -------------------------------
  const [carrito, setCarrito] = useState(null);
  const [cargandoCarrito, setCargandoCarrito] = useState(true);
  const [errorCarrito, setErrorCarrito] = useState("");
  const [pagando, setPagando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // --------------------------------------------------------
  // 1️⃣ Verificar sesión + autocompletar + cargar carrito
  // --------------------------------------------------------
  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (!usuarioActivo) {
      router.push("/login");
      return;
    }

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
  // Calcular total productos
  // --------------------------------------------------------
  const calcularTotalProductos = () => {
    if (!carrito || !carrito.detalles) return 0;
    return carrito.detalles.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      return acc + precio * item.cantidad;
    }, 0);
  };

  const totalProductos = calcularTotalProductos();
  const totalFinal = envio ? totalProductos + envio.costoEnvio : totalProductos;

  // --------------------------------------------------------
  // 2️⃣ Calcular envío
  // --------------------------------------------------------
  const handleCalcularEnvio = async () => {
    setCalculandoEnvio(true);
    setErrorEnvio("");

    try {
      const data = await calcularEnvio({
        direccion,
        comuna,
        region,
      });

      setEnvio(data);
    } catch (err) {
      console.error(err);
      setErrorEnvio("No se pudo calcular el envío.");
    } finally {
      setCalculandoEnvio(false);
    }
  };

  // --------------------------------------------------------
  // 3️⃣ Procesar pago
  // --------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pagando || !envio) return;

    setPagando(true);
    setMensajeExito("");

    const idCarrito = localStorage.getItem("idCarrito");
    const idUsuario = Number(localStorage.getItem("idUsuario") || 1);

    try {
      const resPedido = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/crear/${idCarrito}/${idUsuario}`,
        { method: "POST" }
      );

      if (!resPedido.ok) throw new Error("No se pudo crear el pedido");

      const pedido = await resPedido.json();

      const resPago = await fetch(
        `https://apipago-production-73a5.up.railway.app/Api/v1/pago/pedido/pagar/${pedido.id}?metodoPago=${metodoPago}`,
        { method: "POST" }
      );

      if (!resPago.ok) throw new Error("Error procesando pago");

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

  // ========================================================
  // RENDER
  // ========================================================
  return (
    <>
      {/* Banner */}
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white"
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
          {/* FORMULARIO */}
          <div className="col-md-6 mb-4">
            <h2 className="text-center mb-4">Formulario de Pago</h2>

            <form
              className="shadow p-4 rounded bg-light"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comuna</label>
                <input
                  className="form-control"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Región</label>
                <input
                  className="form-control"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
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
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-3"
                onClick={handleCalcularEnvio}
                disabled={calculandoEnvio}
              >
                {calculandoEnvio ? "Calculando envío..." : "Calcular envío"}
              </button>

              {errorEnvio && (
                <div className="alert alert-danger">{errorEnvio}</div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={pagando || cargandoCarrito || !envio}
              >
                {pagando ? "Procesando pago..." : "Pagar"}
              </button>

              {mensajeExito && (
                <div className="alert alert-success mt-3">{mensajeExito}</div>
              )}
            </form>
          </div>

          {/* RESUMEN */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">Resumen de tu compra</h2>

            {carrito && carrito.detalles && (
              <div className="card shadow">
                <div className="card-body">
                  {carrito.detalles.map((item) => (
                    <div
                      key={item.idProducto}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {item.cantidad} x {item.producto?.nombreProducto}
                      </span>
                      <span>
                        ${item.cantidad * (item.producto?.precio || 0)}
                      </span>
                    </div>
                  ))}

                  {envio && (
                    <>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span>Distancia</span>
                        <span>{envio.distanciaKm} km</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Envío</span>
                        <span>${envio.costoEnvio}</span>
                      </div>
                      <div className="d-flex justify-content-between text-muted">
                        <span>Tiempo</span>
                        <span>{envio.tiempoEstimadoHoras} hrs</span>
                      </div>
                    </>
                  )}

                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${totalFinal}</span>
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/carrito"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Volver al carrito
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
