"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Spinner } from "react-bootstrap";
import useSesion from "@/hooks/useSesion"; // Hook personalizado

export default function LoginForm() {
  const router = useRouter();
  const { iniciarSesion } = useSesion();

  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.correo) {
      newErrors.correo = "Debe ingresar su correo electrónico.";
    }

    if (!formData.password) {
      newErrors.password = "Debe ingresar su contraseña.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://radiant-solace-production-febb.up.railway.app/api/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsLoading(false);
        alert("❌ " + (data.mensaje || "Credenciales inválidas"));
        return;
      }

      // 🔥 Guardar sesión
      iniciarSesion(formData.correo);

      router.push("/productos");
    } catch (error) {
      alert("⚠️ Error conectando al servidor.");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
      className="p-4 bg-light shadow rounded"
    >
      {/* CORREO */}
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

      {/* CONTRASEÑA */}
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

      {/* BOTÓN */}
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
              <Spinner animation="border" size="sm" className="me-2" />
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
