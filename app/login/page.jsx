"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Banner from "@/components/Banner";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Banner titulo="Inicia sesión en DetoxNow" />

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={5} className="bg-white shadow rounded p-4">
            <h3 className="text-center text-success mb-4">Inicio de Sesión</h3>
            <LoginForm />
            <p className="text-center mt-3">
              ¿No tienes cuenta?{" "}
              <a
                href="/registro"
                className="text-success text-decoration-none fw-semibold"
              >
                Regístrate aquí
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
