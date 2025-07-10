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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const http2_1 = require("http2");
exports.orderRouter = express_1.default.Router();
const ordersData_1 = require("../data/sql/ordersData");
exports.orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const orders = yield (0, ordersData_1.getOrders)(Number(client === null || client === void 0 ? void 0 : client.id));
    res.json(orders);
}));
exports.orderRouter.get('/prevPurchased', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const teas = yield (0, ordersData_1.getprevPurchased)(Number(client === null || client === void 0 ? void 0 : client.id));
    res.json(teas);
}));
exports.orderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payment_method_id, shipping_address, delivery_method_id } = req.body;
    const client = req.user;
    try {
        yield (0, ordersData_1.createOrder)(Number(client === null || client === void 0 ? void 0 : client.id), Number(payment_method_id), shipping_address, Number(delivery_method_id));
        res.sendStatus(http2_1.constants.HTTP_STATUS_CREATED);
    }
    catch (_a) {
        res.sendStatus(500);
    }
}));
