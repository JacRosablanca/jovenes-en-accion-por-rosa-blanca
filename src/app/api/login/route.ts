import { NextResponse } from "next/server";
import { APIKEY, SPREADSHEET_ID, RANGE_USUARIOS } from "@/config/idSheets";

export async function POST(req: Request) {
  try {
    const { usuario, contrasena } = await req.json();

    if (!usuario || !contrasena) {
      return NextResponse.json(
        { message: "Usuario y contraseña requeridos" },
        { status: 400 }
      );
    }

    // Consumimos Google Sheets API directamente con fetch
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE_USUARIOS}?key=${APIKEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { message: "Error al consultar Google Sheets" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const rows = data.values || [];

    // buscar usuario y contraseña
    const user = rows.find(
      (row: string[]) => row[0] === usuario && row[1] === contrasena
    );

    if (user) {
      const redirectUrl = user[2] || "/panel";
      return NextResponse.json({ redirectUrl });
    }

    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
