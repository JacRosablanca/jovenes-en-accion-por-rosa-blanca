"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Asegúrate de importar Link

export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 relative">

            {/* Modal de Registro */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                            Formulario de Registro
                        </h3>
                        <form
                            className="space-y-3"
                            onSubmit={async (e) => {
                                e.preventDefault();

                                const formElement = e.target as HTMLFormElement;
                                const data = new FormData(formElement);

                                try {
                                    await fetch(
                                        "https://docs.google.com/forms/u/0/d/1sf7YzDJ7Nl0D_cA5yCj9GZN_FfnlxUKrn6H_DRcW9OA/formResponse",
                                        {
                                            method: "POST",
                                            mode: "no-cors",
                                            body: data,
                                        }
                                    );

                                    // Redirección al inicio
                                    window.location.href = "/";
                                } catch (error) {
                                    console.error("Error al enviar:", error);
                                    // Usar un modal o mensaje en lugar de alert()
                                    // alert("Hubo un problema al registrar. Intenta de nuevo.");
                                }
                            }}
                        >
                            <input
                                type="email"
                                name="entry.2117185795"
                                placeholder="Correo electrónico"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <select
                                name="entry.1771876615"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            >
                                <option value="">Tipo de documento</option>
                                <option>Tarjeta de identidad</option>
                                <option>Cédula de ciudadanía</option>
                            </select>

                            <input
                                type="text"
                                name="entry.723225580"
                                placeholder="Número de documento"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <input
                                type="text"
                                name="entry.1929845918"
                                placeholder='Nombre completo "según documento"'
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <input
                                type="text"
                                name="entry.68529218"
                                placeholder="Dirección de residencia"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <input
                                type="text"
                                name="entry.547704069"
                                placeholder="Barrio de residencia"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <input
                                type="date"
                                name="entry.1091456214"
                                placeholder="Fecha de nacimiento"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            />

                            <select
                                name="entry.1200222756"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                                required
                            >
                                <option value="">Nivel de estudio</option>
                                <option>Primaria</option>
                                <option>Bachillerato grado 6°</option>
                                <option>Bachillerato grado 7°</option>
                                <option>Bachillerato grado 8°</option>
                                <option>Bachillerato grado 9°</option>
                                <option>Bachillerato grado 10°</option>
                                <option>Bachillerato grado 11°</option>
                                <option>Técnico</option>
                                <option>Tecnólogo</option>
                                <option>Profesional</option>
                                <option>Sin Estudios</option>
                            </select>

                            <input
                                type="text"
                                name="entry.808400725"
                                placeholder="Área de estudio o profesión (si aplica)"
                                className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                            >
                                Enviar Registro
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Modal de Documento */}
            {showDocumentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] p-2 rounded-lg shadow-lg max-w-4xl w-full h-[90%] relative flex flex-col">
                        <button
                            onClick={() => setShowDocumentModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-3xl font-bold z-10"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 text-center mb-2">
                            Lista oficial registrada
                        </h3>
                        <div className="flex-grow">
                            <iframe
                                src="https://drive.google.com/file/d/1MUxxzhpOUhp3USObfZNG18IbBT9-vpdP/preview"
                                className="w-full h-full border-none"
                                title="Lista oficial"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Portada */}
            <div className="w-full h-64 relative mb-8">
               <Image src="/equipo.jpg" alt="Portada Jóvenes en Acción" fill className="object-cover rounded-lg shadow-lg" priority />
           </div>

            {/* Título y descripción */}
            <h1 className="text-3xl font-extrabold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Jóvenes en Acción por Rosa Blanca
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
                Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad.
            </p>

            {/* Lista oficial */}
            <div className="mb-8 text-center">
                <button
                    onClick={() => setShowDocumentModal(true)}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                    Lista oficial registrada ante la Registraduría Municipal
                </button>
            </div>

            {/* Candidatos */}
            <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Nuestros Candidatos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        nombre: "Nicol Valeria",
                        edad: "14 años, estudiante",
                        descripcion: "Ejemplo de inclusión y promotora de deportes adaptados.",
                        img: "/nicol.jpg",
                    },
                    {
                        nombre: "Kevin Vergara",
                        edad: "18 años, estudiante de ingeniería",
                        descripcion: "Voz juvenil y promotor social.",
                        img: "/kevin.jpg",
                    },
                    {
                        nombre: "Daniela Gaona",
                        edad: "15 años, estudiante y emprendedora",
                        descripcion: "Apoya negocios juveniles.",
                        img: "/daniela.jpg",
                    },
                ].map((cand, i) => (
                    <div key={i} className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                        <Image src={cand.img} alt={cand.nombre} width={120} height={120} className="rounded-full mb-2 object-cover" />
                        <div className="font-bold text-lg text-[#19295A] dark:text-blue-200 text-center">{cand.nombre}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            {cand.edad}. {cand.descripcion}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje final */}
            <div className="mt-8 text-center text-base text-gray-700 dark:text-gray-200">
                ¡Apoya a nuestros jóvenes y vota por una juventud que construye futuro!
            </div>

            {/* Botón de registro */}
            <div className="mt-4 text-center mb-8"> {/* Añadido mb-8 para espacio antes de las tarjetas */}
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                    ¡Regístrate para apoyar!
                </button>
            </div>

            {/* Nuevas tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Tarjeta de Actividades */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                    <svg className="w-16 h-16 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <h3 className="font-bold text-xl text-[#19295A] dark:text-blue-200 mb-2">Actividades</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Descubre los próximos eventos y actividades que estamos organizando para la comunidad.
                    </p>
                    <Link
                        href="/actividades"
                        className="inline-block bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Ver Actividades
                    </Link>
                </div>

                {/* Tarjeta de Patrocinadores */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                    <svg className="w-16 h-16 text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <h3 className="font-bold text-xl text-[#19295A] dark:text-blue-200 mb-2">Patrocinadores</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Conoce a las empresas y organizaciones que apoyan nuestras iniciativas.
                    </p>
                    <Link
                        href="/apoyanos/patrocinadores" // Puedes crear esta ruta
                        className="inline-block bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        Ver Patrocinadores
                    </Link>
                </div>

                {/* Tarjeta de Haz tu Donación */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
                    <svg className="w-16 h-16 text-yellow-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm0 6h2v2h-2z"/>
                    </svg>
                    <h3 className="font-bold text-xl text-[#19295A] dark:text-blue-200 mb-2">Haz tu Donación</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Tu contribución es vital para el desarrollo de nuestros proyectos comunitarios.
                    </p>
                    <Link
                        href="/apoyanos/donar" // Puedes crear esta ruta
                        className="inline-block bg-yellow-700 text-white py-2 px-4 rounded-lg hover:bg-yellow-800 transition-colors"
                    >
                        Donar Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}