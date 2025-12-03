"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function RegistroForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    longitud: false,
    mayuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
  });

  // Validación dinámica de contraseña
  const validatePassword = (password) => {
    setPasswordRequirements({
      longitud: password.length >= 4 && password.length <= 10,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /[0-9]/.test(password),
      especial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") validatePassword(value);
  };

  // Sincronizar confirmación
  useEffect(() => {
    if (formData.confirmPassword) {
      if (formData.confirmPassword !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Las contraseñas no coinciden.",
        }));
      } else {
        setErrors((prev) => {
          const { confirmPassword, ...rest } = prev;
          return rest;
        });
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // VALIDACIONES
    if (!formData.nombre.trim() || formData.nombre.length > 100)
      newErrors.nombre = "Debe ingresar su nombre (máx. 100 caracteres).";

    if (
      !/^[\w.%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(
        formData.correo
      )
    ) {
      newErrors.correo =
        "Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{4,10}$/;

    if (!passRegex.test(formData.password))
      newErrors.password = "La contraseña no cumple con los requisitos.";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Enviar al Backend real
    try {
      const response = await fetch(
        "https://radiant-solace-production-febb.up.railway.app/api/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formData.nombre,
            correo: formData.correo,
            password: formData.password,
            telefono: formData.telefono,
            direccion: formData.direccion,
            region: formData.region,
            comuna: formData.comuna,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        alert("❌ Error en el registro: " + errorData);
        return;
      }

      alert("✅ Registro exitoso!");

      // Limpiar formulario
      setFormData({
        nombre: "",
        correo: "",
        password: "",
        confirmPassword: "",
        telefono: "",
        direccion: "",
        region: "",
        comuna: "",
      });
    } catch (error) {
      alert("⚠️ Error de conexión con el servidor.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* NOMBRE */}
      <Form.Group className="mb-3">
        <Form.Label>Nombre Completo</Form.Label>
        <Form.Control
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          isInvalid={!!errors.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      {/* CORREO */}
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

      {/* CONTRASEÑA */}
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

        <div className="mt-2">
          <small
            className={
              passwordRequirements.longitud ? "text-success" : "text-danger"
            }
          >
            ▪ Entre 4 y 10 caracteres
          </small>
          <br />
          <small
            className={
              passwordRequirements.mayuscula ? "text-success" : "text-danger"
            }
          >
            ▪ Una letra mayúscula
          </small>
          <br />
          <small
            className={
              passwordRequirements.minuscula ? "text-success" : "text-danger"
            }
          >
            ▪ Una letra minúscula
          </small>
          <br />
          <small
            className={
              passwordRequirements.numero ? "text-success" : "text-danger"
            }
          >
            ▪ Un número
          </small>
          <br />
          <small
            className={
              passwordRequirements.especial ? "text-success" : "text-danger"
            }
          >
            ▪ Un carácter especial (@#$%)
          </small>
        </div>
      </Form.Group>

      {/* CONFIRM PASSWORD */}
      <Form.Group className="mb-3">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      {/* TELÉFONO */}
      <Form.Group className="mb-3">
        <Form.Label>Teléfono (opcional)</Form.Label>
        <Form.Control
          type="number"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </Form.Group>

      {/* DIRECCIÓN */}
      <Form.Group className="mb-3">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          id="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </Form.Group>

      {/* REGION / COMUNA */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Región</Form.Label>
            <Form.Select
              id="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option>Metropolitana de Santiago</option>
              <option>Valparaíso</option>
              <option>Biobío</option>
              <option>Los Lagos</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Comuna</Form.Label>
            <Form.Select
              id="comuna"
              value={formData.comuna}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option>Santiago</option>
              <option>La Florida</option>
              <option>Maipú</option>
              <option>Providencia</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button
        id="btnRegistrar"
        type="submit"
        variant="success"
        className="w-100"
      >
        Registrar
      </Button>
    </Form>
  );
}
