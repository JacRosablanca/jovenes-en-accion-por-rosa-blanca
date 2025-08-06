"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define el tipo para cada actividad
type Actividad = {
  titulo: string;
  fecha: string;
  descripcion: string;
  imagenUrl?: string; // Ahora puede ser opcional si no hay una URL específica
  enlaceDetalle?: string;
};

export default function ActividadesPage() {
  // Datos de actividades hardcodeados como ejemplo
  const [actividades, setActividades] = useState<Actividad[]>([
    {
      titulo: "Taller de Reciclaje Creativo",
      fecha: "2025-09-10",
      descripcion: "Aprende a transformar materiales reciclables en obras de arte y objetos útiles para el hogar.",
      imagenUrl: "/LogoJac.png", // Usando el fallback local
      enlaceDetalle: "#",
    },
    {
      titulo: "Jornada de Limpieza del Parque",
      fecha: "2025-09-22",
      descripcion: "Únete a nosotros para mantener nuestro parque limpio y hermoso para toda la comunidad.",
      imagenUrl: "/LogoJac.png", // Usando el fallback local
      enlaceDetalle: "#",
    },
    {
      titulo: "Festival Gastronómico Local",
      fecha: "2025-10-05",
      descripcion: "Disfruta de la diversidad culinaria de nuestro barrio con platos preparados por nuestros vecinos.",
      imagenUrl: "/LogoJac.png", // Usando el fallback local
      enlaceDetalle: "#",
    },
    {
      titulo: "Clases de Baile Tradicional",
      fecha: "2025-10-15",
      descripcion: "Aprende los pasos de los bailes folclóricos de nuestra región. ¡Para todas las edades!",
      imagenUrl: "/LogoJac.png", // Usando el fallback local
      enlaceDetalle: "#",
    },
    {
      titulo: "Cine al Aire Libre",
      fecha: "2025-10-28",
      descripcion: "Noche de películas bajo las estrellas para toda la familia. Trae tu manta y palomitas.",
      imagenUrl: "/LogoJac.png", // Usando el fallback local
      enlaceDetalle: "#",
    },
  ]);

  // Las variables de loading y error ya no son necesarias para datos hardcodeados
  const loading = false;
  const error = null;

  // Función para limpiar celdas de errores de Google Sheets o espacios extra (se mantiene por si se vuelve a usar)
  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // El useEffect para cargar datos ha sido eliminado ya que ahora son hardcodeados

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Nuestras Actividades
      </h1>

      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">Cargando actividades...</p>
      )}

      {error && (
        <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
      )}

      {!loading && !error && actividades.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay actividades registradas en este momento.
        </p>
      )}

      {/* Grid de actividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actividades.map((actividad, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Si imagenUrl está presente, la usa; de lo contrario, usa /LogoJac.png */}
            <div className="relative w-full h-48">
              <Image
                src={actividad.imagenUrl || "/LogoJac.png"} // Usa el URL de la actividad o el fallback
                alt={actividad.titulo}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
                onError={(e) => { e.currentTarget.src = "/LogoJac.png"; }} // Fallback en caso de error de carga
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300 mt-2">
                {actividad.titulo}
              </h2>
              {actividad.fecha && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  Fecha: {actividad.fecha}
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-200 mt-3 text-base">
                {actividad.descripcion}
              </p>
              {actividad.enlaceDetalle && (
                <Link
                  href={actividad.enlaceDetalle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                >
                  Ver Detalles
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
