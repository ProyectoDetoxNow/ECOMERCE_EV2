"use client";
import { useEffect } from "react";

export default function PagoSuccess() {
  useEffect(() => {
    // mostrar mensaje bonito
    // limpiar carrito visual
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>✅ Pago exitoso</h1>
      <p>Estamos confirmando tu pago...</p>
    </div>
  );
}
