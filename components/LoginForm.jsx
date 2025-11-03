"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Spinner } from "react-bootstrap";
import useSesion from "@/hooks/useSesion"; // 👈 Importamos nuestro hook

export default function LoginForm() {
  const router = useRouter();
  const { iniciarSesion } = useSesion(); // 👈 usamos la función del hook

  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // --- VALIDACIÓN CORREO ---
    if (!formData.correo) {
      newErrors.correo = "Debe ingresar su correo electrónico.";
    } else {
      const correoRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!correoRegex.test(formData.correo)) {
        newErrors.correo =
          "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      }
    }

    // --- VALIDACIÓN CONTRASEÑA ---
    if (!formData.password) {
      newErrors.password = "Debe ingresar su contraseña.";
    } else if (formData.password.length < 4 || formData.password.length > 10) {
      newErrors.password = "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    setErrors(newErrors);

    // --- SI NO HAY ERRORES ---
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      setTimeout(() => {
        alert("✅ Inicio de sesión exitoso!");
        iniciarSesion(formData.correo); // 👈 Guardamos la sesión
        router.push("/productos"); // 🔄 Redirige a productos
      }, 1500);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
      className="p-4 bg-light shadow rounded"
    >
      {/* --- CORREO --- */}
      <Form.Group className="mb-3">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          id="correo"
          value={formData.correo}
          onChange={handleChange}
          isInvalid={!!errors.correo}
          placeholder="ejemplo@duoc.cl"
        />
        <Form.Control.Feedback type="invalid">
          {errors.correo}
        </Form.Control.Feedback>
      </Form.Group>

      {/* --- CONTRASEÑA --- */}
      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          placeholder="Ingrese su contraseña"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-end mb-3">
        <a href="#" className="text-success text-decoration-none">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* --- BOTÓN --- */}
      <div className="text-center">
        <Button
          id="btnLogin"
          type="submit"
          variant="success"
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </div>
    </Form>
  );
}
