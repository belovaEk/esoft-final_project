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
exports.getFederatedCredentials = getFederatedCredentials;
exports.getUser = getUser;
exports.createFederatedCredentials = createFederatedCredentials;
const db_1 = __importDefault(require("./db"));
function getFederatedCredentials(issuer, profileId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = (0, db_1.default) `
            SELECT * 
            FROM federated_credentials 
            WHERE provider = ${issuer} 
            AND subject = ${profileId}
        `;
            const result = yield query;
            return result[0];
        }
        catch (error) {
            console.error('Error fetching federated credentials:', error);
            throw error;
        }
    });
}
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, db_1.default) `SELECT id from client where id = ${id}`;
        return user[0];
    });
}
function createFederatedCredentials(client_id, provider, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) ` INSERT INTO federated_credentials (client_id, provider, subject)
      VALUES (${client_id}, ${provider}, ${subject})`;
        return yield query;
    });
}
