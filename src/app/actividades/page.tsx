"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  LinkFacebook?: string; // Nueva columna 'Link Facebook'
};

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para la imagen seleccionada
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false); // Estado para controlar la carga de la imagen

  // Define el rango de la hoja de cálculo, ahora hasta la columna G para Link Facebook
  const ACTIVIDADES_RANGE = `${SHEET_NAME_ACTIVIDADES}!A1:G`;

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

  // Manejador de clic en la imagen
  const handleImageClick = (imageUrl: string) => {
    setIsImageLoading(true); // Se inicia el estado de carga
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setSelectedImage(imageUrl);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      console.error("Error al cargar la imagen seleccionada.");
      setIsImageLoading(false);
      setSelectedImage(null); // O manejar el error de otra manera
    };
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null);
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
              LinkFacebook: rowObj["Link Facebook"] || "", // Mapea la nueva columna
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div 
              className="relative w-full h-48 flex-shrink-0 cursor-pointer"
              onClick={() => handleImageClick(actividad.Foto || "/LogoJac.png")}
            >
              <Image
                src={actividad.Foto || "/LogoJac.png"} // Usa la URL de la columna 'Foto' o el fallback
                alt={actividad.Actividad} // Usa el título de la actividad
                layout="fill"
                objectFit="contain" // Muestra la imagen completa sin recortar
                className="rounded-t-xl"
                onError={(e) => { e.currentTarget.src = "/LogoJac.png"; }} // Fallback en caso de error de carga de imagen
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300 mt-2">
                {actividad.Actividad}
              </h2>
              {actividad.Descripcion && (
                <p className="text-gray-700 dark:text-gray-200 mt-3 text-base flex-grow">
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
              {actividad.LinkFacebook && (
                <div className="mt-4">
                  <Link
                    href={actividad.LinkFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold text-center"
                  >
                    {/* Icono de Facebook (puedes reemplazarlo por un SVG o un icono de librería) */}
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 13.5h2V16h-2v3h-3v-3H9v-2h2v-2c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v2z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    Ver en Facebook
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal para la imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-[95vw] max-h-[95vh] w-full h-full"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
          >
            {isImageLoading ? (
              <div className="flex justify-center items-center w-full h-full text-white">
                Cargando imagen...
              </div>
            ) : (
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-xl"
              />
            )}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold p-2 leading-none bg-black bg-opacity-50 rounded-full"
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
