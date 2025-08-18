// src/app/panel/[documento]/usuarios/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Usuario {
  numeroDocumento: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  permisos: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    numeroDocumento: "",
    nombreCompleto: "",
    email: "",
    telefono: "",
    permisos: "",
  });
  const [editando, setEditando] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [procesando, setProcesando] = useState(false);

  // 🔹 Cargar usuarios
  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/usuarios");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data: Usuario[] = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // 🔹 Crear usuario
  const handleCrear = async () => {
    try {
      setProcesando(true);
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!res.ok) throw new Error("Error creando usuario");

      setNuevoUsuario({
        numeroDocumento: "",
        nombreCompleto: "",
        email: "",
        telefono: "",
        permisos: "",
      });
      await cargarUsuarios();
    } catch (err) {
      console.error("Error creando usuario", err);
    } finally {
      setProcesando(false);
    }
  };

  // 🔹 Editar usuario
  const handleEditar = (usuario: Usuario) => {
    setEditando(usuario.numeroDocumento);
    setNuevoUsuario(usuario);
  };

  // 🔹 Guardar actualización
  const handleGuardar = async () => {
    if (!editando) return;
    try {
      setProcesando(true);
      const res = await fetch(`/api/usuarios/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!res.ok) throw new Error("Error actualizando usuario");

      setEditando(null);
      setNuevoUsuario({
        numeroDocumento: "",
        nombreCompleto: "",
        email: "",
        telefono: "",
        permisos: "",
      });
      await cargarUsuarios();
    } catch (err) {
      console.error("Error guardando cambios", err);
    } finally {
      setProcesando(false);
    }
  };

  // 🔹 Eliminar usuario
  const handleEliminar = async (id: string) => {
  if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

  try {
    setProcesando(true);
    const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    const data = await res.json(); // 🔹 leer el body del servidor
    if (!res.ok) throw new Error(data.error || "Error eliminando usuario");
    await cargarUsuarios();
  } catch (err) {
    console.error("Error eliminando usuario:", err);
    alert(err); // 🔹 mostrar el error exacto
  } finally {
    setProcesando(false);
  }
};


  return (
    <div className="p-6 text-white">
      {/* ==========================
          FORMULARIO CREAR/EDITAR
      ========================== */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">{editando ? "Editar Usuario" : "Agregar Usuario"}</h2>

        <div className="flex flex-wrap gap-2 mb-2">
          <input
            type="text"
            placeholder="Documento"
            value={nuevoUsuario.numeroDocumento}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, numeroDocumento: e.target.value })}
            className="p-2 border rounded text-black"
            disabled={!!editando}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoUsuario.nombreCompleto}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombreCompleto: e.target.value })}
            className="p-2 border rounded text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={nuevoUsuario.email}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
            className="p-2 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={nuevoUsuario.telefono}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
            className="p-2 border rounded text-black"
          />
          <select
            value={nuevoUsuario.permisos}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, permisos: e.target.value })}
            className="p-2 border rounded text-black"
          >
            <option value="">Seleccionar permisos</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Usuario">Usuario</option>
          </select>
        </div>

        <button
          onClick={editando ? handleGuardar : handleCrear}
          disabled={procesando}
          className={`px-4 py-2 rounded ${editando ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"} disabled:opacity-50`}
        >
          {editando ? "Guardar" : "Crear"}
        </button>
      </div>

      {/* ==========================
          TABLA DE USUARIOS
      ========================== */}
      <h1 className="text-2xl font-bold mb-4">Usuarios Registrados</h1>

      {cargando && <p className="text-gray-400 mb-2">Cargando usuarios...</p>}

      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">Documento</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Email</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Permisos</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={`${u.numeroDocumento}-${index}`} className="border-t border-gray-700">
              <td className="p-2">{u.numeroDocumento}</td>
              <td className="p-2">{u.nombreCompleto}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.telefono}</td>
              <td className="p-2">{u.permisos || "Sin permisos"}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEditar(u)}
                  disabled={procesando}
                  className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(u.numeroDocumento)}
                  disabled={procesando}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
