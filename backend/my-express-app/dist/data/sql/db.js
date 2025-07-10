"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)({
    host: 'localhost',
    port: 5432,
    database: 'TeaTime',
    username: 'postgres',
    password: 'postgres',
    // Дополнительные настройки:
    idle_timeout: 20, // Закрывать неиспользуемые соединения через 20s
    max_lifetime: 60 * 30, // Максимальное время жизни соединения (30 минут)
});
exports.default = sql;
