// src/app/api/usuarios/route.ts
import { NextResponse } from "next/server";
import { APIKEY, SPREADSHEET_ID, RANGE_REGISTRO } from "@/config/idSheets";

export async function GET() {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE_REGISTRO}?key=${APIKEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "No se pudo obtener los usuarios" },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.values || data.values.length < 2) return NextResponse.json([]);

    const headers = [
      "marcaTemporal",
      "numeroDocumento",
      "nombreCompleto",
      "direccion",
      "barrio",
      "fechaNacimiento",
      "nivelEstudio",
      "profesion",
      "habilidad",
      "tipoDocumento",
      "telefono",
      "institucion",
      "actividadCultural",
      "actividadDeportiva",
      "areasInteres",
      "columna16",
      "email",
    ];

    const rows = data.values.slice(1);

    const usuarios = rows.map((row: string[]) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] || "";
      });
      return obj;
    });

    return NextResponse.json(usuarios);
  }  catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
