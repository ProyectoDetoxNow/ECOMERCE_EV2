import DetalleProducto from "../../components/DetalleProductos";
import { obtenerProductoPorId } from "../../data/inventarioApi";

export default async function DetalleProductoPage({ searchParams }) {
  const id = searchParams.producto;
  const productoEncontrado = await obtenerProductoPorId(id);

  return (
    <>
      <div
        className="banner-superior d-flex align-items-center justify-content-center text-white text-shadow"
        style={{
          backgroundImage: 'url("/imagenes/primera_imag.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <h1 className="display-5 fw-bold">Detalle del Producto</h1>
      </div>

      <DetalleProducto producto={productoEncontrado} />
    </>
  );
}
