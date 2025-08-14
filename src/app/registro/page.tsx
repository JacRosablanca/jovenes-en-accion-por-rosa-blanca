"use client";

import { useState } from "react";

export default function RegistroPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtherSport, setShowOtherSport] = useState(false);
    const [showOtherCultural, setShowOtherCultural] = useState(false);
    const [showOtherArea, setShowOtherArea] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formElement = e.target as HTMLFormElement;
        const data = new FormData(formElement);
        
        // Ajuste para el campo de Habilidad o Talento Especial
        const selectedTalent = data.get("entry.2117185795");
        if (selectedTalent) {
            data.set("entry.2117185795", selectedTalent);
        } else {
            // Si no se selecciona nada, enviamos una cadena vacía o un valor por defecto
            data.set("entry.2117185795", "");
        }
        
        // Lógica para separar la fecha de nacimiento
        const birthdate = data.get("entry.1091456214");
        if (birthdate) {
            const dateParts = birthdate.toString().split("-");
            data.set("entry.1091456214_year", dateParts[0]);
            data.set("entry.1091456214_month", dateParts[1]);
            data.set("entry.1091456214_day", dateParts[2]);
        }
        
        try {
            await fetch(
                "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkYJ3V0fbaEp6p0f1gwhiA09gGJqu9cOeLKUbkd8aIj0IpkQ/formResponse",
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

    const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherSport(e.target.value === "Otros:");
    };

    const handleCulturalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherCultural(e.target.value === "Otros:");
    };

    const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherArea(e.target.value === "Otros:");
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Formulario de Registro
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input type="email" name="entry.1771876615" placeholder="Correo electrónico" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="tel" name="entry.1491259931" placeholder="Teléfono de contacto" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <select name="entry.1900605101" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required>
                    <option value="">Tipo de documento</option>
                    <option>Tarjeta de identidad</option>
                    <option>Cédula de ciudadanía</option>
                </select>
                <input type="text" name="entry.723225580" placeholder="Número de documento" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.1929845918" placeholder='Nombre completo "según documento"' className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.68529218" placeholder="Dirección de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.547704069" placeholder="Barrio de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="date" name="entry.1091456214" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                <input type="text" name="entry.1204224148" placeholder="Colegio o Universidad donde estudia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" />
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
                <input type="text" name="entry.808400725" placeholder="Si eres técnico, tecnólogo o profesional, dinos tu área de estudio o tu profesión" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" />
                
                {/* Habilidad o Talento Especial (Corregido el nombre del campo) */}
                <select name="entry.2117185795" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white">
                    <option value="">Habilidad o Talento Especial</option>
                    <option>Talento Académico</option>
                    <option>Talento Artístico</option>
                    <option>Talento Deportivo</option>
                    <option>Talento Tecnológico</option>
                    <option>Talento Social</option>
                    <option>Talento Emocional</option>
                </select>
                
                {/* Actividad Cultural con "Otros:" */}
                <select name="entry.2111191203" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" onChange={handleCulturalChange}>
                    <option value="">¿Practicas alguna actividad cultural?</option>
                    <option>Canto</option>
                    <option>Baile</option>
                    <option>Música</option>
                    <option>Teatro</option>
                    <option>Pintura</option>
                    <option>Otros:</option>
                </select>
                {showOtherCultural && (
                    <input type="text" name="entry.2111191203.other_option_responseS" placeholder="Especifica la actividad cultural" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                )}

                {/* Actividad Deportiva con "Otros:" */}
                <select name="entry.1670636493" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" onChange={handleSportChange}>
                    <option value="">¿Practicas alguna actividad deportiva?</option>
                    <option>Fútbol</option>
                    <option>Microfutbol / Futbol de salón</option>
                    <option>Baloncesto</option>
                    <option>Natación</option>
                    <option>Ciclismo</option>
                    <option>Atletismo</option>
                    <option>Patinaje</option>
                    <option>Otros:</option>
                </select>
                {showOtherSport && (
                    <input type="text" name="entry.1670636493.other_option_response" placeholder="Especifica tu deporte" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                )}

                {/* Áreas de Interés con "Otros:" */}
                <select name="entry.1524387239" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" onChange={handleAreaChange}>
                    <option value="">¿En qué áreas te gustaría participar o recibir formación?</option>
                    <option>Liderazgo</option>
                    <option>Oratoria</option>
                    <option>Emprendimiento</option>
                    <option>Programación</option>
                    <option>Artes y Cultura</option>
                    <option>Deportes</option>
                    <option>Medio Ambiente</option>
                    <option>Otros:</option>
                </select>
                {showOtherArea && (
                    <input type="text" name="entry.1524387239.other_option_response" placeholder="Especifica tu área de interés" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                )}

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