"use client";

export default function PagoForm({
  nombre,
  setNombre,
  correo,
  setCorreo,
  direccion,
  setDireccion,
  comuna,
  setComuna,
  region,
  setRegion,
  metodoPago,
  setMetodoPago,
  onCalcularEnvio,
  calculandoEnvio,
  errorEnvio,
  onSubmit,
  pagando,
  envio,
  mensajeExito,
}) {
  return (
    <>
      <h2 className="text-center mb-4">Formulario de Pago</h2>

      <form className="shadow p-4 rounded bg-light" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comuna</label>
          <input
            className="form-control"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Región</label>
          <input
            className="form-control"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de Pago</label>
          <select
            className="form-select"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
          >
            <option value="">Selecciona un método</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary w-100 mb-3"
          onClick={onCalcularEnvio}
          disabled={calculandoEnvio}
        >
          {calculandoEnvio ? "Calculando envío..." : "Calcular envío"}
        </button>

        {errorEnvio && <div className="alert alert-danger">{errorEnvio}</div>}

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={pagando || !envio}
        >
          {pagando ? "Procesando pago..." : "Pagar"}
        </button>

        {mensajeExito && (
          <div className="alert alert-success mt-3">{mensajeExito}</div>
        )}
      </form>
    </>
  );
}
