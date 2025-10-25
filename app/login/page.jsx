"use client";
import { useState } from "react";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Correo: ${correo}\nContraseña: ${clave}`);
  };

  return (
    <div className="col-md-4 mx-auto mt-5">
      <h2 className="mb-4 text-center text-success">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button className="btn btn-success w-100">Entrar</button>
      </form>
    </div>
  );
}