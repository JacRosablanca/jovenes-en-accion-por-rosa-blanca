// src/app/api/usuarios/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "@/config/idSheets";

const RANGE_GET = "A1:R"; // 📌 Incluye encabezados
const RANGE_POST = "A2:R"; // 📌 Inserta sin tocar encabezados

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

/* ================================
   📌 GET: Listar usuarios
================================ */
export async function GET() {
  try {
    const sheets = await getSheets();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_GET,
    });

    const rows = res.data.values || [];
    if (rows.length < 2) return NextResponse.json([]);

    const headers = rows[0]; // ✅ fila de encabezados
    const usuarios = rows
      .slice(1) // ✅ desde la segunda fila son usuarios
      .map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => (obj[h] = row[i] || ""));

        return {
          numeroDocumento: obj["Número de documento"] || "",
          nombreCompleto: obj['Nombre completo "según documento"'] || "",
          email: obj["Dirección de correo electrónico"] || "",
          telefono: obj["Teléfono de Contacto"] || "",
          permisos: obj["Permisos"] || "",
        };
      })
      .filter((u) => u.numeroDocumento);

    return NextResponse.json(usuarios);
  } catch (err) {
    console.error("Error GET usuarios", err);
    return NextResponse.json({ error: "Error leyendo usuarios" }, { status: 500 });
  }
}

/* ================================
   📌 POST: Crear usuario
================================ */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { numeroDocumento, nombreCompleto, email, permisos, telefono } = body;

    if (!numeroDocumento || !nombreCompleto || !email) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const sheets = await getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_POST,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString(), // Marca temporal (A)
            numeroDocumento,             // Documento (B)
            nombreCompleto,              // Nombre (C)
            "", "", "", "", "", "",      // D-I
            "",                          // Tipo documento (J)
            permisos || "",              // Permisos (K)
            "", "", "", "",              // L-O
            "",                          // Columna 16 (P)
            email,                       // Email (Q)
            telefono || ""               // Teléfono (R)
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error POST usuario", err);
    return NextResponse.json({ error: "Error creando usuario" }, { status: 500 });
  }
}
