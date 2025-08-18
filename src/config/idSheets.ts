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

//credenciales

export const GOOGLE_CLIENT_EMAIL = "jacrosablanca1girardot@teak-brook-456920-t2.iam.gserviceaccount.com";
export const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZK9qDkg9l1Fno\nE4UUuD6w/6S73hywafD+DhCcjxWv1lOY7ZMKdKnvdlB0E4oyWIu6xIlyTekPcDaW\nGHhSAbhWSpSBuflRuA3BYcTwSU8qCU27qoRklC9FWlpEQR1T/JTgp1TIRmLL3aym\nWfoLDcWNnmFajjXfh0I3OopycnG71pFgPAK+yl2KITcW24JMQFWohXEa23QV8o4i\nM/pt97734UuXeKPqKGTh3Nt5/0RAw1ZaFIVnOaKKiZk3DDVPL5zd/zSgVOVeEtnt\nhyOwiJijjc1fajBwBhmO1YDmcmu4IVrPnkGVU534ZVc6j6rCQyrHyeeLaomVgO0u\n06FraUv9AgMBAAECggEAAi9s+6mOzK4d5kC5ClWil1XeXMvLbvzj8kvzEri733lY\nUfs5uNF3RzJR7YYF17gJrk11hIr2A0Fflf6dYNYjch+4RK2JkA/nKlYhwCfbmEbv\ns/i30NOIZR3n4cdoCrW0zgu1GvJeIHh2KR1pgtTcd6vFycvzms/MMwuDxCQ72Skt\n3UOtL4VF9mbwNTM4xIQ+hhEcqHT1gFFq+zZS+5WBwUQiUKQNA6suD4M29In9FuzT\nw7YTMzDAMVfyen4sAL2BUgqOyrDjCWHlE/IqGxLS8PYf/YpkbklRrxmyZdTDtVRX\nIaAWBcxw5eRoc/1qCi7KZr9Tb4XZD9gLKilqi/vaQQKBgQDHnFtwiEGbL35KeQj+\n4x9tt9MiEnN9KvlC5B2dN5MnN4xiUFdnOvj95CXBEVqA1sMO22QSdxkw4NAs7aSR\nsDgggoleU6aQzqBA8/Ywrc8zK2o+Hlf1YRIneuAERirIHPHQUW6kldBwJJsePHwV\n0noh/qOfpM5zP9vZfDcluJP8bQKBgQDEcQri7do35tj4E/wjp0bz5vCJMiDJ8HjN\nH5y+tZMLoSY06EvFHKaT+lq0n7EvlmEDuDsDtC3BT+FyMJXGas5mTc3Fh6KhsoMs\nUjXCwdqFj/DrnYJ+xjECqitJ1EG93W5jWXANSU+DtVCP829Lq2HtQj4NE29MW12d\nFmNW5niz0QKBgFijV/96ohd1WZFceeAlnxkrnfftVZdpc9J+VaAww4mQoygtIQLY\nLyUfIJzBRf0cYPXB+ogwluEbk5W/2WpQZDwbe0CFyNtYxdTSAKrRI8dHKiB3fPub\npWIesEd1mR3PrJmi74zqceq6dp9QoJFYK5/Y4XPMzVhkLQ5AmISJmD1pAoGBAK8y\n6rSt0dvdpVDL8iqSPDO3mnuiG6A/Ol4nfZKROo46sWqqazlnbiG4PUGu00ZP5kJ9\nAxUwk0Y/yiAfuNT32RFg/s7XQ3LXVSooQA5s+kn4sLRTDFmoxXlM78Ku7ds6LAOr\ndsZCxgn/odRhFrf0KCiE1faviKofKoS5vOt6LdihAoGAbaWCSja915WimeJctXr3\nOVE1MiRzpTNLrF6DoZ2/l778wZjIjI3rV9MvCKnvyu5pP5nryaaNb0MJVLMVXDRc\nO8p9ZYhlvFgZ0NGUttAe1oU4T/MMX5NPM+7O9AnGV4Rsg7xR9tpgipWwKQcyE5Lv\ngjNKSmcnj+O3AodqS+XLS80=\n-----END PRIVATE KEY-----\n";