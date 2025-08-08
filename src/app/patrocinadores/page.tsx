"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { APIKEY, SPREADSHEET_ID, SHEET_NAME_PATROCINADORES } from "@/config/idSheets";

// Define el tipo para cada patrocinador, basándose en los nuevos encabezados
type Patrocinador = {
  Logo: string;
  Negocio: string;
  Administrador: string;
  Direccion: string;
  Contacto: string;
  Correo: string;
  Web?: string;
  Facebook?: string;
  RedesSociales?: string;
};

// Función auxiliar para asegurarse de que las URL tengan un protocolo (https://)
const ensureProtocol = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

// Componente para mostrar íconos de redes sociales con SVG en línea
const SocialIcons = ({ patrocinador }: { patrocinador: Patrocinador }) => {
  const icons = [
    { name: 'Web', link: patrocinador.Web, svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> },
    { name: 'Facebook', link: patrocinador.Facebook, svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { name: 'Redes Sociales', link: patrocinador.RedesSociales, svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
  ];

  return (
    <div className="flex justify-center mt-4 space-x-4">
      {icons.map((icon, idx) =>
        icon.link ? (
          <a
            key={idx}
            href={ensureProtocol(icon.link)} // Usar la función para validar y corregir el enlace
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors"
            title={`Visitar ${icon.name}`}
          >
            {icon.svg}
          </a>
        ) : null
      )}
    </div>
  );
};

export default function PatrocinadoresPage() {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // Define el rango de la hoja de cálculo para patrocinadores
  const PATROCINADORES_RANGE = `${SHEET_NAME_PATROCINADORES}!A1:H`;

  // URL para obtener datos de Google Sheets API en formato JSON
  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${PATROCINADORES_RANGE}?key=${APIKEY}`;
  
  // Función para limpiar celdas de errores de Google Sheets o espacios extra
  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // Manejador de clic en la imagen para abrir el modal
  const handleImageClick = (imageUrl: string) => {
    setIsImageLoading(true);
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setSelectedImage(imageUrl);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      console.error("Error al cargar la imagen seleccionada.");
      setIsImageLoading(false);
      setSelectedImage(null);
    };
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Efecto para cargar los patrocinadores desde la hoja de cálculo
  useEffect(() => {
    async function fetchPatrocinadores() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim());
          const rows = data.values.slice(1);

          const parsedPatrocinadores: Patrocinador[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              rowObj[header] = cleanCell(cols[idx] || "");
            });

            return {
              Logo: rowObj["LOGONEGOCIO"] || "/LogoJac.png",
              Negocio: rowObj["NEGOCIO"] || "Negocio Desconocido",
              Administrador: rowObj["ADMINISTRADOR"] || "Administrador Desconocido",
              Direccion: rowObj["DIRECCION"] || "Sin dirección.",
              Contacto: rowObj["CONTACTO"] || "Sin contacto",
              Correo: rowObj["CORREO ELECTRONICO"] || "Sin correo",
              Web: rowObj["WEB"] || "",
              Facebook: rowObj["FACEBOOK"] || "",
              RedesSociales: rowObj["REDES SOCIALES"] || "",
            };
          });
          setPatrocinadores(parsedPatrocinadores);
        } else {
          setPatrocinadores([]);
        }
      } catch (err) {
        console.error("Error cargando patrocinadores:", err);
        setError("No se pudieron cargar los patrocinadores. Revisa tu conexión y la configuración de la API.");
      } finally {
        setLoading(false);
      }
    }
    fetchPatrocinadores();
  }, [SHEET_URL]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
          Nuestros Patrocinadores
        </h1>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">Cargando patrocinadores...</p>
        )}

        {error && (
          <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
        )}

        {!loading && !error && patrocinadores.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No hay patrocinadores registrados en este momento.
          </p>
        )}

        {/* Grid de patrocinadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patrocinadores.map((patrocinador, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-6 text-center"
            >
              {/* Contenedor del logo con onClick para abrir el modal */}
              <div
                className="relative w-36 h-36 flex-shrink-0 cursor-pointer mb-4"
                onClick={() => handleImageClick(patrocinador.Logo)}
              >
                <Image
                  src={patrocinador.Logo}
                  alt={`Logo de ${patrocinador.Negocio}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                  onError={(e) => { e.currentTarget.src = "/LogoJac.png"; }}
                />
              </div>

              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300">
                {patrocinador.Negocio}
              </h2>
              <p className="text-md text-gray-600 dark:text-gray-300">
                {patrocinador.Administrador}
              </p>

              <div className="mt-4 text-sm text-gray-700 dark:text-gray-200 space-y-1 w-full">
                {patrocinador.Direccion && <p><strong>Dirección:</strong> {patrocinador.Direccion}</p>}
                {patrocinador.Contacto && <p><strong>Contacto:</strong> {patrocinador.Contacto}</p>}
                {patrocinador.Correo && <p><strong>Email:</strong> <a href={`mailto:${patrocinador.Correo}`} className="text-blue-600 dark:text-blue-400 hover:underline">{patrocinador.Correo}</a></p>}
              </div>

              <SocialIcons patrocinador={patrocinador} />
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
              className="relative max-w-[95vw] max-h-[95vh] w-full"
              onClick={(e) => e.stopPropagation()}
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
    </div>
  );
}
