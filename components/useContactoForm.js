"use client";
import { useState } from "react";

export default function useContactoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [contadorMensaje, setContadorMensaje] = useState(0);

  const handleMensajeChange = (e) => {
    const valor = e.target.value;
    setMensaje(valor);
    setContadorMensaje(valor.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (nombre.trim() === "" || nombre.trim().length > 100) {
      alert("Por favor ingresa un nombre válido (máx 100 caracteres).");
      return;
    }

    if (mensaje.trim() === "" || mensaje.trim().length > 500) {
      alert("Por favor ingresa un mensaje válido (máx 500 caracteres).");
      return;
    }

    // Si todo está OK
    alert("¡Gracias por contactarnos! Te responderemos pronto.");
    setNombre("");
    setEmail("");
    setAsunto("");
    setMensaje("");
    setContadorMensaje(0);
  };

  return {
    nombre,
    setNombre,
    email,
    setEmail,
    asunto,
    setAsunto,
    mensaje,
    contadorMensaje,
    handleMensajeChange,
    handleSubmit,
  };
}
