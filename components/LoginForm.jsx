"use client";

import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function LoginForm() {
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // limpiar error previo
    setLoading(true);

    let newErrors = {};

    if (!formData.correo)
      newErrors.correo = "Debe ingresar su correo electrónico.";
    if (!formData.password) newErrors.password = "Debe ingresar su contraseña.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://radiant-solace-production-febb.up.railway.app/api/usuarios/login",
        {
          // CAMBIAR cuando despliegues a Railway!!!
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en el inicio de sesión");
      }

      const usuario = await response.json();

      // Guardar en localStorage (opcional)
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage"));

      alert("Inicio de sesión exitoso");
      console.log("Usuario logueado:", usuario);

      // Aquí puedes redirigir a dashboard o home
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          id="correo"
          value={formData.correo}
          onChange={handleChange}
          isInvalid={!!errors.correo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.correo}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
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

      <div className="text-center">
        <Button
          type="submit"
          variant="success"
          className="w-100"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </Button>
      </div>
    </Form>
  );
}
