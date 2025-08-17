// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [usuario, setUsuario] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("usuario");
        if (storedUser) {
            setUsuario(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        router.push("/ingresar");
    };

    return (
        <nav className="bg-black text-white shadow-lg">
            {/* Barra superior */}
            <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
                <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                    <Image
                        src="/LogoJac.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
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

                    {/* Dropdown si hay usuario */}
                    {usuario ? (
                        <li className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-green-400 font-semibold hover:text-green-300"
                            >
                                Bienvenido, {usuario}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                href="{`/panel/${numeroDocumento}/perfil`}"
                                                className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                                            >
                                                Mi perfil
                                            </Link>

                                        </li>
                                        <li>
                                            <Link
                                                href="/panel/${numeroDocumento}"
                                                className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                                            >
                                                Panel
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSdkYJ3V0fbaEp6p0f1gwhiA09gGJqu9cOeLKUbkd8aIj0IpkQ/viewform"
                                    className="bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-800 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Registrarme
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/ingresar"
                                    className="bg-blue-800 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-900 transition-colors"
                                >
                                    Ingresa
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-black">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
                        <li><Link href="/actividades" onClick={() => setIsMenuOpen(false)}>Actividades</Link></li>
                        <li><Link href="/patrocinadores" onClick={() => setIsMenuOpen(false)}>Patrocinadores</Link></li>
                        <li><Link href="/apoyanos/donar" onClick={() => setIsMenuOpen(false)}>Donaciones</Link></li>
                        <li><Link href="/sobre-nosotros" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link></li>

                        {/* Dropdown usuario móvil */}
                        {usuario ? (
                            <li className="text-green-400 font-semibold relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="hover:text-green-300"
                                >
                                    Bienvenido, {usuario}
                                </button>
                                {isDropdownOpen && (
                                    <div className="mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                                        <ul className="py-2">
                                            <li>
                                                <Link
                                                    href="/panel/${usuario}/perfil"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                                                >
                                                    Mi perfil
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/panel/${usuario}"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                                                >
                                                    Panel
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                                                >
                                                    Cerrar sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSdkYJ3V0fbaEp6p0f1gwhiA09gGJqu9cOeLKUbkd8aIj0IpkQ/viewform"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-green-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-800 transition-colors block text-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Registrarme
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/ingresar"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-blue-800 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-900 transition-colors block text-center"
                                    >
                                        Ingresa
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
