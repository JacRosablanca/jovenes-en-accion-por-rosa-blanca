import React from 'react'
import '@/styles/globals.css'
import Navbar from "@/components/nav/page";

export const metadata = {
    title: 'Jóvenes en Acción por Rosa Blanca',
    description: 'Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad. Apoya a nuestros jóvenes y vota por una juventud que construye futuro.',
    icons: {
        icon: '/LogoJac.png', // Path to your favicon
    },
    // Añadimos las etiquetas Open Graph y Twitter para la previsualización en redes sociales
    openGraph: {
        title: 'Jóvenes en Acción Por Rosa Blanca',
        description: 'Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad. Apoya a nuestros jóvenes y vota por una juventud que construye futuro.',
        url: 'https://jovenes-en-accion-por-rosa-blanca.vercel.app/', // Reemplaza con la URL de tu sitio web
        siteName: 'Jóvenes en Acción Por Rosa Blanca',
        images: [
            {
                url: '/LogoJac.png', // Reemplaza con la URL de tu imagen de previsualización (se recomienda 1200x630 píxeles)
                width: 1200,
                height: 630,
                alt: 'Jóvenes en Acción Por Rosa Blanca',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    facebook: {
        card: 'summary_large_image',
        title: 'Jóvenes en Acción Por Rosa Blanca',
        description: 'Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad. Apoya a nuestros jóvenes y vota por una juventud que construye futuro.',
        images: ['https://www.facebook.com/profile.php?id=61578843050469'], // Reemplaza con la misma URL de tu imagen de previsualización
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className="min-h-screen bg-[#f5f6fa] text-[#18181b] dark:bg-[#18181b] dark:text-[#f5f6fa] font-sans antialiased transition-colors duration-300">
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
