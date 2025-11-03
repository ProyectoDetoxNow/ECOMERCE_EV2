"use client";

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { productos } from "../../data/productos";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";

export default function ProductosPage() {
  const listaProductos = Object.values(productos);

  return (
    <>
      {/* Banner superior */}
      <div
        style={{
          backgroundImage: `url('/imagenes/primera_imag.jpg')`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="display-5 fw-bold">Productos DetoxNow</h1>
      </div>

      {/* Listado de productos */}
      <Container className="mt-5">
        <Row className="g-4">
          {listaProductos.map((p) => (
            <Col key={p.id} md={4}>
              <Card className="shadow text-center h-100">
                <div className="p-3">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    width={180}
                    height={180}
                    className="mx-auto d-block rounded"
                    style={{
                      objectFit: "cover",
                      width: "180px",
                      height: "180px",
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{p.nombre}</Card.Title>
                  <Card.Text>{p.descripcion}</Card.Text>

                  <div className="d-flex justify-content-center gap-2">
                    {/* Botón Ver más */}
                    <Button
                      variant="outline-success"
                      onClick={() =>
                        (window.location.href = `/detProducto?producto=${p.id}`)
                      }
                    >
                      <i className="bi bi-info-circle"></i> Ver más
                    </Button>

                    {/* Botón Agregar al carrito */}
                    <BotonAgregarCarrito
                      producto={p}
                      className="btn btn-success"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
