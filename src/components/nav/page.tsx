"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black text-white shadow-lg">
            {/* Barra superior */}
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
                <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                    <Image src="/LogoJac.png" alt="Logo" width={40} height={40} className="rounded-full" />
                    <span className="text-xl font-bold text-blue-200">
                        Jóvenes en Acción Por Rosa Blanca
                    </span>
                </Link>

                {/* Botón menú móvil */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6 text-blue-200" />
                    ) : (
                        <Menu className="w-6 h-6 text-blue-200" />
                    )}
                </button>

                {/* Menú escritorio */}
                <ul className="hidden md:flex items-center space-x-6">
                    <li><Link href="/" className="hover:text-blue-400 font-medium">Inicio</Link></li>
                    <li><Link href="/actividades" className="hover:text-blue-400 font-medium">Actividades</Link></li>
                    <li><Link href="/patrocinadores" className="hover:text-blue-400 font-medium">Patrocinadores</Link></li>
                    <li><Link href="/apoyanos/donar" className="hover:text-blue-400 font-medium">Donaciones</Link></li>
                    <li><Link href="/sobre-nosotros" className="hover:text-blue-400 font-medium">Sobre Nosotros</Link></li>
                    <li>
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdkYJ3V0fbaEp6p0f1gwhiA09gGJqu9cOeLKUbkd8aIj0IpkQ/viewform"
                            className="bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-800 transition-colors"
                            target="_blank" // Nuevo: Abre el enlace en una nueva ventana/pestaña
                            rel="noopener noreferrer" // Nuevo: Medida de seguridad para enlaces externos
                        >
                            Registrarme
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/login"
                            className="bg-blue-800 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-900 transition-colors"
                        >
                            Ingresa
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Menú móvil (ocupa espacio y empuja el contenido) */}
            {isMenuOpen && (
                <div className="md:hidden bg-black">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
                        <li><Link href="/actividades" onClick={() => setIsMenuOpen(false)}>Actividades</Link></li>
                        <li><Link href="/patrocinadores" onClick={() => setIsMenuOpen(false)}>Patrocinadores</Link></li>
                        <li><Link href="/apoyanos/donar" onClick={() => setIsMenuOpen(false)}>Donaciones</Link></li>
                        <li><Link href="/sobre-nosotros" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link></li>
                        <li>
                            <Link
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdkYJ3V0fbaEp6p0f1gwhiA09gGJqu9cOeLKUbkd8aIj0IpkQ/viewform"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-800 transition-colors block text-center"
                                target="_blank" // Nuevo: Abre el enlace en una nueva ventana/pestaña
                                rel="noopener noreferrer" // Nuevo: Medida de seguridad para enlaces externos
                            >
                                Registrarme
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-blue-800 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-900 transition-colors block text-center"
                            >
                                Ingresa
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}