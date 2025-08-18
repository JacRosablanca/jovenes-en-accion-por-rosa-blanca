// src/app/api/usuarios/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "@/config/idSheets";

const RANGE = "A1:R";

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
   GET: Listar usuarios
================================ */
export async function GET() {
  try {
    const sheets = await getSheets();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    if (rows.length < 2) return NextResponse.json([]);

    // 📌 Tomamos la fila 1 como encabezado
    const usuarios = rows.slice(1).map(row => ({
      numeroDocumento: row[1] || "", // Col B
      nombreCompleto: row[2] || "",  // Col C
      permisos: row[10] || "",       // Col K
      email: row[16] || "",          // Col Q
      telefono: row[17] || ""        // Col R
    })).filter(u => u.numeroDocumento);

    return NextResponse.json(usuarios);
  } catch (err) {
    console.error("Error GET usuarios", err);
    return NextResponse.json({ error: "Error leyendo usuarios" }, { status: 500 });
  }
}

/* ================================
   POST: Crear usuario
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
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toLocaleString(), // A
          numeroDocumento,             // B
          nombreCompleto,              // C
          "", "", "", "", "", "",      // D-I
          "",                          // J
          permisos || "",              // K
          "", "", "", "",              // L-O
          "",                          // P
          email,                       // Q
          telefono || ""               // R
        ]]
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error POST usuario", err);
    return NextResponse.json({ error: "Error creando usuario" }, { status: 500 });
  }
}
