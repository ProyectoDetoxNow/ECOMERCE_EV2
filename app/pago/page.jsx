"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCarrito } from "@/services/apiCarrito";
import { calcularEnvio } from "@/services/apiEnvio";
import { crearPedido, pagarPedido } from "@/services/apiPago";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import PagoForm from "../../components/PagoForm";
import ResumenCompra from "../../components/ResumenCompra";

export default function PagoPage() {
  const router = useRouter();

  // -------------------------------
  // Datos usuario / formulario
  // -------------------------------
  const [nombre, setNombre] = useState("");
  //const [apellidos, setApellidos] = useState("");
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
  const [pagando, setPagando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // -------------------------------
  // Estados Mercado Pago
  // -------------------------------
  const [preference_id, setPreferenceId] = useState(null);

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago("APP_USR-0e458623-640e-41d4-a990-980f33c660de", {
      locale: "es-CL",
    });
  }, []);



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
      setCargandoCarrito(false);
      return;
    }

    const cargarCarrito = async () => {
      try {
        const data = await getCarrito(idCarrito);
        setCarrito(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargandoCarrito(false);
      }
    };

    cargarCarrito();
  }, [router]);


  // --------------------------------------------------------
  // Crear preferencia Mercado Pago cuando carrito cambie
  // --------------------------------------------------------

  useEffect(() => {
    const createPreference = async () => {
      if (!carrito?.detalles?.length) return;

      try {
        const response = await fetch("http://localhost:3030/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: carrito.detalles.map((item) => ({
              title: item.producto.nombre,
              quantity: item.cantidad,
              unit_price: item.producto.precio,
            })),
          }),
        });

        if (!response.ok) throw new Error("Error al crear la preferencia");

        const data = await response.json();
        setPreferenceId(data.preference_id);
      } catch (error) {
        console.error("Error creando preferencia:", error);
      }
    };

    createPreference();
  }, [carrito]);



  // --------------------------------------------------------
  // Calcular total productos
  // --------------------------------------------------------
  const totalProductos =
    carrito?.detalles?.reduce(
      (acc, item) => acc + (item.producto?.precio || 0) * item.cantidad,
      0
    ) || 0;

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
      const pedido = await crearPedido(idCarrito, idUsuario);
      await pagarPedido(pedido.id, metodoPago);

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
            <PagoForm
              nombre={nombre}
              setNombre={setNombre}
              correo={correo}
              setCorreo={setCorreo}
              direccion={direccion}
              setDireccion={setDireccion}
              comuna={comuna}
              setComuna={setComuna}
              region={region}
              setRegion={setRegion}
              metodoPago={metodoPago}
              setMetodoPago={setMetodoPago}
              onCalcularEnvio={handleCalcularEnvio}
              calculandoEnvio={calculandoEnvio}
              errorEnvio={errorEnvio}
              onSubmit={handleSubmit}
              pagando={pagando}
              envio={envio}
              mensajeExito={mensajeExito}
              preference_id={preference_id}
            />
          </div>

          {/* RESUMEN */}
          <div className="col-md-6">
            <ResumenCompra
              carrito={carrito}
              envio={envio}
              totalFinal={totalFinal}
            />
          </div>
        </div>
      </div>
    </>
  );
}