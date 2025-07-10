"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teaProducts = void 0;
exports.loadData = loadData;
exports.saveData = saveData;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, 'db_Tea.json');
exports.teaProducts = [];
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(DB_PATH, 'utf-8');
            exports.teaProducts = JSON.parse(data);
        }
        catch (err) {
            exports.teaProducts = [];
            yield saveData();
            console.error('Ошибка загрузки данных:', err);
        }
    });
}
function saveData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.writeFile(DB_PATH, JSON.stringify(exports.teaProducts, null, 2));
        }
        catch (err) {
            console.error('Ошибка сохранения данных:', err);
            throw err;
        }
    });
}
