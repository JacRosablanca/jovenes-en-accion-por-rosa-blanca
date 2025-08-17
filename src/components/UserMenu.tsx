"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserMenu({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ejemplo simple de cerrar sesión
    router.push("/login");
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botón principal */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        Bienvenido {username}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-900 ring-1 ring-gray-700 transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-2 flex flex-col">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
