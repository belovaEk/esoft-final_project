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
exports.getClient = getClient;
exports.postClient = postClient;
exports.patchClient = patchClient;
exports.deleteClient = deleteClient;
const db_1 = __importDefault(require("./db"));
function getClient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, db_1.default) `SELECT * from client where id = ${id}`;
        return client;
    });
}
function postClient(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `insert into client (name, email) values (${name}, ${email}) RETURNING id`;
        const newId = yield query;
        return newId[0].id;
    });
}
function patchClient(client_id, name, email, is_mailing) {
    return __awaiter(this, void 0, void 0, function* () {
        if (name === undefined && email === undefined && is_mailing === undefined) {
            throw new Error("Должно присутсвтовать хотя бы одно поле для изменения");
        }
        const updates = [];
        const params = [];
        if (name !== undefined && name !== null) {
            updates.push(`name = $${updates.length + 1}`);
            params.push(name);
        }
        if (email !== undefined && email !== null) {
            updates.push(`email = $${updates.length + 1}`);
            params.push(email);
        }
        if (is_mailing !== undefined) {
            updates.push(`is_mailing = $${updates.length + 1}`);
            params.push(is_mailing);
        }
        const queryString = `UPDATE client SET ${updates.join(', ')} WHERE id = $${updates.length + 1}`;
        params.push(client_id);
        return yield db_1.default.unsafe(queryString, params);
    });
}
function deleteClient(client_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `delete from client
     where id = ${client_id}`;
        return yield query;
    });
}
