// src/app/api/usuarios/[id]/route.ts
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
   📌 PUT: Actualizar usuario
================================ */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id } = params;

    const sheets = await getSheets();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    const idx = rows.findIndex((row) => row[1] === id); // Documento en columna B

    if (idx === -1) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // ✅ Actualizamos solo los campos recibidos
    rows[idx][1] = body.numeroDocumento || rows[idx][1];
    rows[idx][2] = body.nombreCompleto || rows[idx][2];
    rows[idx][10] = body.permisos || rows[idx][10]; // Permisos (col K)
    rows[idx][16] = body.email || rows[idx][16];    // Email (col Q)
    rows[idx][17] = body.telefono || rows[idx][17]; // Teléfono (col R)

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `A${idx + 1}:R${idx + 1}`, // Fila exacta
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [rows[idx]] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error PUT usuario", err);
    return NextResponse.json({ error: "Error actualizando usuario" }, { status: 500 });
  }
}

/* ================================
   📌 DELETE: Eliminar usuario
================================ */
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const sheets = await getSheets();

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    const idx = rows.findIndex((row) => row[1] === id); // Documento en col B

    if (idx === -1) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Eliminamos fila (dejando cabecera)
    rows.splice(idx, 1);

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error DELETE usuario", err);
    return NextResponse.json({ error: "Error eliminando usuario" }, { status: 500 });
  }
}
