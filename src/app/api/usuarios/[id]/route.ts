import { NextRequest, NextResponse } from "next/server";
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

export async function DELETE(req: NextRequest) {
  try {
    // Extraer el ID desde la URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // último segmento
    if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

    const sheets = await getSheets();

    // Obtener sheetId de la primera hoja
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheetId = meta.data.sheets?.[0]?.properties?.sheetId;
    if (!sheetId) throw new Error("No se encontró sheetId");

    // Leer todas las filas
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    const idx = rows.findIndex((row) => row[1] === id);
    if (idx === -1) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    // Eliminar fila
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
