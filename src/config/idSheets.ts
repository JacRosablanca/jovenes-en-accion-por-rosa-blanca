// src/config/idSheets.ts
// ⚠️ IMPORTANTE: Aunque aquí están las claves en duro, lo recomendable es usar variables de entorno.
// Si decides no usarlas, este archivo funcionará igual.

// ==============================
//  CONFIGURACIÓN DE GOOGLE SHEETS
// ==============================

// API KEY (puede venir de variable de entorno o estar en duro)
export const APIKEY = "AIzaSyCNy_Lm0M11a4y_M5erDHFzLk-TBhrnZkk";

// ID de la hoja de cálculo (Google Sheets)
export const SPREADSHEET_ID = "1Ab3Cy1ZBMtyeHbSSfJblQtFQg3YO-vpZnvHDCtSRxTM";

// Nombre de las hojas (tabs dentro del Spreadsheet)
export const SHEET_NAME_ACTIVIDADES = "Eventos";

export const SHEET_NAME_DONACIONES = "Donaciones";

export const SHEET_NAME_PATROCINADORES = "Patrocinadores";

export const SHEET_NAME_USUARIOS = "Usuarios";

export const SHEET_NAME_REGISTRO = "Registro de Jovenes";

// Si quieres todas las columnas y filas de la hoja
export const RANGE_ACTIVIDADES = `${SHEET_NAME_ACTIVIDADES}!A1:J`;
export const RANGE_DONACIONES = `${SHEET_NAME_DONACIONES}!A1:E`;
export const RANGE_PATROCINADORES = `${SHEET_NAME_PATROCINADORES}!A1:H`;
export const RANGE_USUARIOS = `${SHEET_NAME_USUARIOS}!A1:C`;
export const RANGE_REGISTRO = `${SHEET_NAME_REGISTRO}!A1:Q`;