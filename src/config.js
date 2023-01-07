import { config as dotenv } from "dotenv";
dotenv();
//DOTENV PARA LEER VARIABLES GLOBALES .ENV
export const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'api_triky',
}