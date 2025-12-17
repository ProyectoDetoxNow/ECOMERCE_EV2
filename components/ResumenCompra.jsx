import Link from "next/link";

export default function ResumenCompra({ carrito, envio, totalFinal }) {
  if (!carrito || !carrito.detalles) return null;

  return (
    <>
      <h2 className="text-center mb-4">Resumen de tu compra</h2>

      <div className="card shadow">
        <div className="card-body">
          {carrito.detalles.map((item) => (
            <div
              key={item.idProducto}
              className="d-flex justify-content-between mb-2"
            >
              <span>
                {item.cantidad} x {item.producto?.nombreProducto}
              </span>
              <span>${item.cantidad * (item.producto?.precio || 0)}</span>
            </div>
          ))}

          {envio && (
            <>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Distancia</span>
                <span>{envio.distanciaKm} km</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío</span>
                <span>${envio.costoEnvio}</span>
              </div>
              <div className="d-flex justify-content-between text-muted">
                <span>Tiempo</span>
                <span>{envio.tiempoEstimadoHoras} hrs</span>
              </div>
            </>
          )}

          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>${totalFinal}</span>
          </div>
        </div>
      </div>

      <Link href="/carrito" className="btn btn-outline-primary w-100 mt-3">
        Volver al carrito
      </Link>
    </>
  );
}
