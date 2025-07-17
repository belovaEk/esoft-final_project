"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
require("dotenv/config");
if (!process.env.DATABASE_HOST || !process.env.DATABASE_PORT || !process.env.DATABASE_NAME || !process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
    throw new Error('Missing required environment variables');
}
const sql = (0, postgres_1.default)({
    DATABASE_HOST: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    DATABASE_NAME: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    // Дополнительные настройки:
    idle_timeout: 20, // Закрывать неиспользуемые соединения через 20s
    max_lifetime: 60 * 30, // Максимальное время жизни соединения (30 минут)
});
exports.default = sql;
