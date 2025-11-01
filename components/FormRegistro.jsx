"use client";

import { useState } from "react";
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

  const validatePassword = (password) => {
    setPasswordRequirements({
      longitud: password.length >= 4 && password.length <= 10,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /[0-9]/.test(password),
      especial: /[@#$%]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (id === "password") validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.nombre)
      newErrors.nombre = "Debe ingresar su nombre y apellido.";
    if (
      !/^[\w.%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(
        formData.correo
      )
    )
      newErrors.correo =
        "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("✅ Registro exitoso!");
      console.log(formData);
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
        />
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
        <Form.Control.Feedback type="invalid">
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

      <Button type="submit" variant="success" className="w-100">
        Registrar
      </Button>
    </Form>
  );
}
