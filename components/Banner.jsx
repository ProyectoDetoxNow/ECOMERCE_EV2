export default function Banner({ titulo }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-white text-shadow"
      style={{
        backgroundImage: 'url("/imagenes/primera_imag.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
      }}
    >
      {/* <h1 className="display-4 fw-bold">{titulo}</h1> */}
      <h1 className="fw-bold display-5">{titulo}</h1>
    </div>
  );
}
