"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Usamos iconos de lucide-react, una biblioteca de iconos limpia y moderna.
// Asumiendo que está disponible en el entorno. Si no, se puede usar un SVG inline.
import { Menu, X } from 'lucide-react';

/**
 * Componente de barra de navegación reutilizable y responsive.
 * Se colapsa en un menú de hamburguesa en dispositivos móviles.
 * @returns El componente de navegación.
 */
export default function Navbar() {
    // Estado para controlar la visibilidad del modal de "Ingresa"
    const [showModal, setShowModal] = useState(false);
    // Nuevo estado para controlar la visibilidad del menú de hamburguesa en móviles
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Barra de Navegación */}
            <nav className="bg-white dark:bg-[#1a1a1a] shadow-lg py-4 px-6 md:px-12 fixed w-full top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
                    {/* Logo/Título - Enlace a la página principal */}
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                        <Image src="/LogoJac.png" alt="Logo" width={40} height={40} className="rounded-full" />
                        <span className="text-xl font-bold text-[#19295A] dark:text-blue-200">
                            Jóvenes en Acción Por Rosa Blanca
                        </span>
                    </Link>

                    {/* Botón de Menú para dispositivos móviles */}
                    {/* Es visible solo en pantallas pequeñas (oculto en md y más grandes) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {/* Se usa un ícono de hamburguesa o una "X" según el estado del menú */}
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-[#19295A] dark:text-blue-200" />
                        ) : (
                            <Menu className="w-6 h-6 text-[#19295A] dark:text-blue-200" />
                        )}
                    </button>

                    {/* Menú de Navegación - Escritorio */}
                    {/* Es visible en pantallas medianas y grandes */}
                    <ul className="hidden md:flex items-center space-x-6">
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

                {/* Menú de Navegación - Móvil */}
                {/* Visible solo en pantallas pequeñas si `isMenuOpen` es verdadero */}
                <div
                    className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
                        isMenuOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                    <ul className="flex flex-col space-y-4 pt-4 pb-2">
                        <li>
                            <Link href="/" className="block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md" onClick={() => setIsMenuOpen(false)}>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/actividades" className="block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md" onClick={() => setIsMenuOpen(false)}>
                                Actividades
                            </Link>
                        </li>
                        <li>
                            <Link href="/patrocinadores" className="block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md" onClick={() => setIsMenuOpen(false)}>
                                Patrocinadores
                            </Link>
                        </li>
                        <li>
                            <Link href="/apoyanos/donar" className="block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md" onClick={() => setIsMenuOpen(false)}>
                                Donaciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre-nosotros" className="block py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-md" onClick={() => setIsMenuOpen(false)}>
                                Sobre Nosotros
                            </Link>
                        </li>
                        <li className="pt-2">
                            <button
                                onClick={() => { setShowModal(true); setIsMenuOpen(false); }}
                                className="w-full bg-[#19295A] text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Ingresa
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Modal de Ingreso (Se muestra condicionalmente) */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
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

// Para que el componente sea ejecutable en el entorno, lo exportamos como App
export function App() {
    return <Navbar />;
}
