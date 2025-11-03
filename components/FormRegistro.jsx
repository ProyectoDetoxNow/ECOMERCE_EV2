"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function RegistroForm() {
  // --- Estados del formulario ---
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

  // --- Validar requisitos de contraseña dinámicamente ---
  const validatePassword = (password) => {
    setPasswordRequirements({
      longitud: password.length >= 4 && password.length <= 10,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /[0-9]/.test(password),
      especial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    });
  };

  // --- Actualizar campos ---
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") validatePassword(value);
  };

  // --- Validación en tiempo real de confirmación ---
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

  // --- Envío del formulario ---
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validación de nombre
    if (!formData.nombre.trim() || formData.nombre.length > 100)
      newErrors.nombre = "Debe ingresar su nombre (máx. 100 caracteres).";

    // Validación de correo
    if (
      !/^[\w.%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(
        formData.correo
      ) ||
      formData.correo.length > 100
    )
      newErrors.correo =
        "Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.";

    // Validación de contraseña con regex global
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{4,10}$/;
    if (!passRegex.test(formData.password))
      newErrors.password = "La contraseña no cumple con los requisitos.";

    // Confirmar contraseña
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(newErrors);

    // Si todo está correcto
    if (Object.keys(newErrors).length === 0) {
      alert("✅ Registro exitoso!");
      console.log(formData);

      // Resetear formulario
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
      setPasswordRequirements({
        longitud: false,
        mayuscula: false,
        minuscula: false,
        numero: false,
        especial: false,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
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

      <Form.Group className="mb-3">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback id="confirmPasswordFeedback" type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teléfono (opcional)</Form.Label>
        <Form.Control
          type="number"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          id="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </Form.Group>

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
