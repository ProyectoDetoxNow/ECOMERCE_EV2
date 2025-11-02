let productos = [
  {
    id: "batido-verde",
    nombre: "Batido Verde Clásico",
    descripcion: "Rico en clorofila y antioxidantes...",
    imagen: "/imagenes/Batido Verde Clásico.jpg",
  },
  {
    id: "batido-tropical",
    nombre: "Batido Tropical Detox",
    descripcion: "Refrescante y digestivo...",
    imagen: "/imagenes/Batido Tropical Detox.jpg",
  },
  {
    id: "batido-limon-chia",
    nombre: "Batido Limón & Chía",
    descripcion: "Hidratante y depurativo...",
    imagen: "/imagenes/Batido Limón & Chía.jpg",
  },
];

// Leer todos
export const obtenerProductos = () => productos;

// Crear
export const agregarProducto = (nuevoProducto) => {
  productos.push(nuevoProducto);
};

// Actualizar
export const actualizarProducto = (id, datosActualizados) => {
  productos = productos.map((p) =>
    p.id === id ? { ...p, ...datosActualizados } : p
  );
};

// Eliminar
export const eliminarProducto = (id) => {
  productos = productos.filter((p) => p.id !== id);
};
