// Simulación de base de datos
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

// CRUD (Create, Read, Update, Delete)
export const obtenerProductos = () => productos;

export const agregarProducto = (nuevo) => {
  productos.push(nuevo);
};

export const actualizarProducto = (id, actualizado) => {
  productos = productos.map((p) =>
    p.id === id ? { ...p, ...actualizado } : p
  );
};

export const eliminarProducto = (id) => {
  productos = productos.filter((p) => p.id !== id);
};
