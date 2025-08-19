"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos los datos del usuario en localStorage para usarlos en el frontend
        localStorage.setItem("usuario", data.usuario);
        localStorage.setItem("nombre", data.nombre);
        // Se guarda el tipo de usuario para construir rutas dinámicas
        localStorage.setItem("tipousuario", data.tipoUsuario);
        
        // Se construye la URL de redirección dinámicamente
        // Ahora, la URL de redirección es /super-admin/123456/panel
        router.push(`/${data.tipoUsuario}/${data.usuario}/panel`);
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error interno al conectar con el servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Ingresar</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 font-semibold transition-colors shadow-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
