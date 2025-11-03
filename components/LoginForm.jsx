"use client";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function LoginForm() {
  const [formData, setFormData] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});

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
      alert("✅ Inicio de sesión exitoso!");
      console.log("Datos enviados:", formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          id="correo"
          value={formData.correo}
          onChange={handleChange}
          isInvalid={!!errors.correo}
        />
        <Form.Control.Feedback id="correoFeedback" type="invalid">
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
        <Form.Control.Feedback id="passwordFeedback" type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-end mb-3">
        <a href="#" className="text-success text-decoration-none">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <div className="text-center">
        <Button id="btnLogin" type="submit" variant="success" className="w-100">
          Iniciar Sesión
        </Button>
      </div>
    </Form>
  );
}
