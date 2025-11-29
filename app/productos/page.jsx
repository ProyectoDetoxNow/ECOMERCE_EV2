"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito";
import { obtenerInventario } from "@/services/inventarioApi";

export default function ProductosPage() {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    obtenerInventario()
      .then((data) => {
        setListaProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el inventario");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <div className="container my-5 text-center"><h4>{error}</h4></div>;

  return (
    <>
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

      <Container className="mt-5">
        <Row className="g-4">
          {listaProductos.map((p) => (
            <Col key={p.id} md={4}>
              <Card className="shadow text-center h-100">
                <div className="p-3">
                  <Image
                    src={`/imagenes/${p.imagen}`}
                    alt={p.nombreProducto}
                    width={180}
                    height={180}
                    className="mx-auto d-block rounded"
                    style={{ objectFit: "cover", width: "180px", height: "180px" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{p.nombreProducto}</Card.Title>
                  <Card.Text>{`$${p.precio}`}</Card.Text>
                  <div className="d-flex justify-content-center gap-2">
                    <Link href={`/detProducto?producto=${p.id}`} passHref>
                      <Button variant="outline-success">
                        <i className="bi bi-info-circle"></i> Ver más
                      </Button>
                    </Link>
                    <BotonAgregarCarrito
                      producto={{
                        id: p.id,
                        nombre: p.nombreProducto,
                        precio: p.precio,
                        imagen: p.imagen,
                      }}
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
