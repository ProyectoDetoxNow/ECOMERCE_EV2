// --- Simulación de base de datos con persistencia local ---
const STORAGE_KEY = "productosDB";

// Datos iniciales (solo la primera vez)
const productosIniciales = [
  {
    id: "batido-verde",
    nombre: "Batido Verde Clásico",
    descripcion: "Rico en clorofila y antioxidantes...",
    imagen: "/imagenes/Batido Verde Clásico.jpg",
    categoria: "Verde",
  },
  {
    id: "batido-tropical",
    nombre: "Batido Tropical Detox",
    descripcion: "Refrescante y digestivo...",
    imagen: "/imagenes/Batido Tropical Detox.jpg",
    categoria: "Tropical",
  },
  {
    id: "batido-limon-chia",
    nombre: "Batido Limón & Chía",
    descripcion: "Hidratante y depurativo...",
    imagen: "/imagenes/Batido Limón & Chía.jpg",
    categoria: "Citrico",
  },
];

// --- Cargar productos desde localStorage (si existen) ---
function cargarProductos() {
  if (typeof window === "undefined") return productosIniciales; // SSR safe
  const almacenados = localStorage.getItem(STORAGE_KEY);
  return almacenados ? JSON.parse(almacenados) : productosIniciales;
}

// --- Guardar productos en localStorage ---
function guardarProductos(productos) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  }
}

// Estado actual en memoria
let productos = cargarProductos();

// --- CRUD (Create, Read, Update, Delete) ---

// Leer todos
export const obtenerProductos = () => productos;

//Crear nuevo producto
export const agregarProducto = (nuevo) => {
  productos.push(nuevo);
  guardarProductos(productos);
};

// Actualizar producto existente
export const actualizarProducto = (id, actualizado) => {
  productos = productos.map((p) =>
    p.id === id ? { ...p, ...actualizado } : p
  );
  guardarProductos(productos);
};

// Eliminar producto
export const eliminarProducto = (id) => {
  productos = productos.filter((p) => p.id !== id);
  guardarProductos(productos);
};

// Obtener producto por ID (útil para detalle)
export const obtenerProductoPorId = (id) => {
  return productos.find((p) => p.id === id);
};
