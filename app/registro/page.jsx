"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RegistroForm from "../../components/FormRegistro";

export default function RegistroPage() {
  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6} className="bg-white shadow rounded p-4">
            <h3 className="text-center text-success mb-4">
              Registro de Usuario
            </h3>
            <RegistroForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
