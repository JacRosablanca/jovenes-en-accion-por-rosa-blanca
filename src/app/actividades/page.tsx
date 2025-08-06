"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { APIKEY, SPREADSHEET_ID, SHEET_NAME_ACTIVIDADES } from "@/config/idSheets"; // Importa las constantes de tu idSheets.ts

// Define el tipo para cada actividad, basándose en los encabezados de tu hoja de cálculo
type Actividad = {
  Foto: string; // Columna 'Foto' en tu hoja, que contiene la URL de la imagen
  Actividad: string; // Columna 'Actividad' en tu hoja, que es el título
  Descripcion: string; // Columna 'Descripcion' en tu hoja
  Fecha: string; // Columna 'Fecha' en tu hoja
  Hora: string; // Columna 'Hora' en tu hoja
  Lugar: string; // Columna 'Lugar' en tu hoja
  // enlaceDetalle ya no está en los encabezados de tu hoja, así que lo quitamos si no es necesario
};

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define el rango de la hoja de cálculo
  const ACTIVIDADES_RANGE = `${SHEET_NAME_ACTIVIDADES}!A1:F`; // De A1 a F, para incluir todos los encabezados y datos

  // URL para obtener datos de Google Sheets API en formato JSON
  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ACTIVIDADES_RANGE}?key=${APIKEY}`;

  // Función para limpiar celdas de errores de Google Sheets o espacios extra
  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // Efecto para cargar las actividades desde la hoja de cálculo
  useEffect(() => {
    async function fetchActividades() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim()); // Encabezados de la primera fila
          const rows = data.values.slice(1); // Datos a partir de la segunda fila

          const parsedActividades: Actividad[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              rowObj[header] = cleanCell(cols[idx] || "");
            });

            return {
              Foto: rowObj["Foto"] || "/LogoJac.png", // Usa la columna 'Foto' o el fallback
              Actividad: rowObj["Actividad"] || "Actividad sin título",
              Descripcion: rowObj["Descripcion"] || "Sin descripción.",
              Fecha: rowObj["Fecha"] || "",
              Hora: rowObj["Hora"] || "",
              Lugar: rowObj["Lugar"] || "",
              // enlaceDetalle no está en la hoja, así que no lo mapeamos aquí.
              // Si lo necesitas, deberías añadir una columna en tu hoja.
            };
          });
          setActividades(parsedActividades);
        } else {
          setActividades([]); // No hay datos o solo encabezados
        }
      } catch (err) {
        console.error("Error cargando actividades:", err);
        setError("No se pudieron cargar las actividades. Revisa tu conexión y la configuración de la API.");
      } finally {
        setLoading(false);
      }
    }
    fetchActividades();
  }, [SHEET_URL]); // El efecto se vuelve a ejecutar si la URL de la hoja cambia

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
            <div className="relative w-full h-48">
              <Image
                src={actividad.Foto || "/LogoJac.png"} // Usa la URL de la columna 'Foto' o el fallback
                alt={actividad.Actividad} // Usa el título de la actividad
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
                onError={(e) => { e.currentTarget.src = "/LogoJac.png"; }} // Fallback en caso de error de carga de imagen
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300 mt-2">
                {actividad.Actividad}
              </h2>
              {actividad.Descripcion && (
                <p className="text-gray-700 dark:text-gray-200 mt-3 text-base">
                  {actividad.Descripcion}
                </p>
              )}
              {(actividad.Fecha || actividad.Hora || actividad.Lugar) && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {actividad.Fecha && <p><strong>Fecha:</strong> {actividad.Fecha}</p>}
                  {actividad.Hora && <p><strong>Hora:</strong> {actividad.Hora}</p>}
                  {actividad.Lugar && <p><strong>Lugar:</strong> {actividad.Lugar}</p>}
                </div>
              )}
              {/* Si tuvieras un enlaceDetalle en la hoja, lo renderizarías aquí */}
              {/* Por ejemplo:
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
              */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}