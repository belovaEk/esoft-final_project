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
exports.getOrders = getOrders;
exports.getprevPurchased = getprevPurchased;
exports.createOrder = createOrder;
const db_1 = __importDefault(require("./db"));
function getOrders(client_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `SELECT 
    o.id, o.pretty_id, o.date, o.total_price,
    status.name as status_name,
    JSON_AGG(JSON_BUILD_OBJECT(
        'item_id', i.id,
        'tea_id', i.tea_id,
		'tea_name', t.name,
        'quantity', i.quantity,
        'isCart', CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END

    )) as items
    FROM "order" o
    JOIN order_item i ON o.id = i.order_id
    JOIN status ON o.status_id = status.id
    JOIN tea t on i.tea_id = t.id
    LEFT JOIN cart ON t.id = cart.tea_id AND cart.client_id = ${client_id}
    WHERE o.client_id = ${client_id}
    GROUP BY o.id, o.date, o.total_price, status.name
    ORDER BY o.id DESC`;
        return yield query;
    });
}
function getprevPurchased(client_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `SELECT DISTINCT ON (o_i.tea_id)
	o_i.tea_id as id,
	t.name, t.price, t.description, 
	country.name as country_name,
	type.name AS type_name,
	CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
    CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
	
    from order_item o_i

    join "order" o on o_i.order_id = o.id
    join tea t on o_i.tea_id = t.id
    JOIN country ON t.country_id = country.id
    JOIN type ON t.type_id = type.id
    LEFT JOIN favourite fav ON t.id = fav.tea_id AND fav.client_id = ${client_id}
    LEFT JOIN cart ON t.id = cart.tea_id AND cart.client_id = ${client_id}
    where o.client_id = ${client_id}`;
        return yield query;
    });
}
function createOrder(client_id, payment_method_id, shipping_address, delivery_method_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, db_1.default) `SELECT create_order_from_cart(${client_id}, ${payment_method_id}, ${shipping_address}, ${delivery_method_id}) AS order_id`;
        return yield query;
    });
}
