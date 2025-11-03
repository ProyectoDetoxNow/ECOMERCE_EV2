"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // ✅ Importaciones necesarias
import { productos } from "../../data/productos";
import BotonAgregarCarrito from "@/components/BotonAgregarCarrito"; // ✅ Asegúrate de que exista y esté bien escrito

export default function ProductosPage() {
  const router = useRouter();
  const listaProductos = Object.values(productos);

  return (
    <>
      {/* Banner o cabecera */}
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
                    {/* ✅ Navegación sin usar window */}
                    <Button
                      variant="outline-success"
                      onClick={() =>
                        router.push(`/detProducto?producto=${p.id}`)
                      }
                    >
                      <i className="bi bi-info-circle"></i> Ver más
                    </Button>

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
