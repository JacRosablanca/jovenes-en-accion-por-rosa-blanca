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
   DELETE: Eliminar usuario
================================*/
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const sheets = await getSheets();

    // Obtener sheetId de la primera hoja
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheet = meta.data.sheets?.[0];
    if (!sheet?.properties?.sheetId) throw new Error("No se encontró sheetId");
    const sheetId = sheet.properties.sheetId;

    // Leer todas las filas
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    const idx = rows.findIndex((row) => row[1] === id); // Columna B = documento
    if (idx === -1) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    // Eliminar fila con batchUpdate usando el sheetId correcto
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId,
                dimension: "ROWS",
                startIndex: idx,
                endIndex: idx + 1,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
  console.error("Error DELETE usuario", err);
  return NextResponse.json({
    error: (err as Error)?.message || "Error eliminando usuario"
  }, { status: 500 });
}
}
