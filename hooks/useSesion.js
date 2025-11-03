"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useSesion() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  // ✅ Detecta automáticamente si cambia el localStorage (ej: login o logout)
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("usuarioActivo");
      setUsuario(user);
    };

    // Cargar al iniciar
    checkUser();

    // Escuchar cambios en el almacenamiento
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const iniciarSesion = (correo) => {
    localStorage.setItem("usuarioActivo", correo);
    setUsuario(correo);
    // 🔄 Notifica a otras pestañas o componentes
    window.dispatchEvent(new Event("storage"));
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    window.dispatchEvent(new Event("storage"));
    alert("👋 Sesión cerrada correctamente");
    router.push("/login");
  };

  return { usuario, iniciarSesion, cerrarSesion };
}
