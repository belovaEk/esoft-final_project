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
exports.getCart = getCart;
exports.patchCart = patchCart;
exports.postCart = postCart;
exports.deleteCartItem = deleteCartItem;
const db_1 = __importDefault(require("./db"));
function getCart(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `select c.id as cartItem_id, t.id, t.name, t.description, t.price, c.amount
    from  cart c 
    join tea t on c.tea_id = t.id
    where c.client_id = ${clientId}
    ORDER BY id ASC`;
        return yield query;
    });
}
function patchCart(client_id, tea_id, newAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `update cart
    set amount = ${newAmount}
    where client_id = ${client_id} and tea_id = ${tea_id}`;
        return yield query;
    });
}
function postCart(client_id, tea_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `insert into cart (client_id, tea_id)
        values (${client_id}, ${tea_id});`;
        return yield query;
    });
}
function deleteCartItem(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `delete from cart
     where client_id = ${options.clientId} and tea_id=${options.teaId}`;
        return yield query;
    });
}
