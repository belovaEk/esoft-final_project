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
exports.getFavourites = getFavourites;
exports.getFavouriteCount = getFavouriteCount;
exports.postFavouriteItem = postFavouriteItem;
exports.deleteFavouriteItem = deleteFavouriteItem;
const db_1 = __importDefault(require("./db"));
function getFavourites(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `select f.id as favouriteitem_id, t.id, t.name, t.description, t.price,  t.img_name, ty.name AS type_name,
    case when cart.tea_id is not null then true else false end as isCart
    from  favourite f 
    join tea t on f.tea_id = t.id
    join type ty on t.type_id = ty.id
    left join cart on f.tea_id = cart.tea_id and cart.client_id = ${clientId}
    where f.client_id = ${clientId}`;
        return yield query;
    });
}
function getFavouriteCount(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `select count(*) 
    from favourite
    where client_id = ${clientId}`;
        return yield query;
    });
}
function postFavouriteItem(client_id, tea_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `insert into favourite (client_id, tea_id)
    values
    (${client_id}, ${tea_id})`;
        return yield query;
    });
}
function deleteFavouriteItem(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `delete from favourite
     where client_id = ${options.clientId} and tea_id=${options.teaId}`;
        return yield query;
    });
}
