"use client";

import { useState } from "react";

export default function RegistroPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

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
            window.location.href = "/";
        } catch (error) {
            console.error("Error al enviar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Formulario de Registro
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input type="email" name="entry.2117185795" placeholder="Correo electrónico" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <select name="entry.1771876615" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required>
                    <option value="">Tipo de documento</option>
                    <option>Tarjeta de identidad</option>
                    <option>Cédula de ciudadanía</option>
                </select>
                <input type="text" name="entry.723225580" placeholder="Número de documento" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.1929845918" placeholder='Nombre completo "según documento"' className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.68529218" placeholder="Dirección de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.547704069" placeholder="Barrio de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="date" name="entry.1091456214" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <select name="entry.1200222756" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required>
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
                <input type="text" name="entry.808400725" placeholder="Área de estudio o profesión (si aplica)" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                >
                    {isSubmitting ? "Enviando..." : "Enviar Registro"}
                </button>
            </form>
        </div>
    );
}
