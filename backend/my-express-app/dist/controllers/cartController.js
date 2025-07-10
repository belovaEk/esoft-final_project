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
const express_1 = __importDefault(require("express"));
const http2_1 = require("http2");
const cartData_1 = require("../data/sql/cartData");
const cartRouter = express_1.default.Router();
cartRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const cart = yield (0, cartData_1.getCart)(client === null || client === void 0 ? void 0 : client.id);
    res.json(cart);
}));
cartRouter.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const { tea_id, newAmount } = req.body;
    yield (0, cartData_1.patchCart)(Number(client === null || client === void 0 ? void 0 : client.id), Number(tea_id), Number(newAmount));
    res.status(http2_1.constants.HTTP_STATUS_OK).send();
}));
cartRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tea_id } = req.body;
        const client = req.user;
        yield (0, cartData_1.postCart)(Number(client === null || client === void 0 ? void 0 : client.id), Number(tea_id));
        res.status(http2_1.constants.HTTP_STATUS_CREATED).send();
    }
    catch (err) {
        res.sendStatus(http2_1.constants.HTTP_STATUS_BAD_REQUEST);
    }
}));
cartRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teaId } = req.query;
    const client = req.user;
    yield (0, cartData_1.deleteCartItem)({
        clientId: Number(client === null || client === void 0 ? void 0 : client.id),
        teaId: Number(teaId),
    });
    res.status(http2_1.constants.HTTP_STATUS_OK).send();
}));
exports.default = cartRouter;
