"use client";

export default function ModalCaso({ caso, onCerrar }) {
  if (!caso) return null;

  return (
    <div
      className="custom-modal d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1050,
      }}
    >
      <div
        className="custom-modal-content bg-white p-4 rounded shadow"
        style={{ width: "90%", maxWidth: "600px", position: "relative" }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={onCerrar}
        ></button>
        <h4>{caso.titulo}</h4>
        <ul>
          <li>
            <strong>Perfil:</strong> {caso.perfil}
          </li>
          <li>
            <strong>Resultado:</strong> {caso.resultado}
          </li>
          <li>
            <strong>Claves:</strong> {caso.claves}
          </li>
        </ul>
      </div>
    </div>
  );
}
