"use client";

import { useState } from "react";
// Se asume que estos componentes existen en tu entorno Next.js
import Image from "next/image";
import Link from "next/link";

/**
 * Componente de barra de navegación reutilizable.
 * @returns El componente de navegación.
 */
export default function Navbar() {
    // Estado para controlar la visibilidad del modal de "Ingresa"
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Barra de Navegación */}
            <nav className="bg-white dark:bg-[#1a1a1a] shadow-lg py-4 px-6 md:px-12">
                <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
                    {/* Logo/Título - Enlace a la página principal */}
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                        {/* Se usa una imagen de placeholder para que el código sea ejecutable */}
                        <Image src="/LogoJac.png" alt="Logo" width={40} height={40} className="rounded-full" />
                        <span className="text-xl font-bold text-[#19295A] dark:text-blue-200">
                            Jóvenes en Acción Por Rosa Blanca
                        </span>
                    </Link>

                    {/* Menú de Navegación */}
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/actividades" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Actividades
                            </Link>
                        </li>
                        <li>
                            <Link href="/patrocinadores" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Patrocinadores
                            </Link>
                        </li>
                        <li>
                            <Link href="/apoyanos/donar" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Donaciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre-nosotros" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Sobre Nosotros
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-[#19295A] text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Ingresa
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Modal de Ingreso (Se muestra condicionalmente) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                            ¡Bienvenido!
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-center">
                            Aquí iría tu formulario de inicio de sesión o registro.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

// ========================================================================
// Para que el componente sea ejecutable en el entorno, lo exportamos como App
// y lo renderizamos aquí. En tu proyecto, este sería el contenido de
// src/components/nav/page.tsx, y lo importarías en tu página principal.
// ========================================================================
export function App() {
  return <Navbar />;
}
