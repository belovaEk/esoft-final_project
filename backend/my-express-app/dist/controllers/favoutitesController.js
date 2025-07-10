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
const favouritesData_1 = require("../data/sql/favouritesData");
const favouriteRouter = express_1.default.Router();
favouriteRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const cart = yield (0, favouritesData_1.getFavourites)(client === null || client === void 0 ? void 0 : client.id);
    res.json(cart);
}));
favouriteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tea_id } = req.body;
    const client = req.user;
    try {
        yield (0, favouritesData_1.postFavouriteItem)(Number(client === null || client === void 0 ? void 0 : client.id), Number(tea_id));
        res.status(http2_1.constants.HTTP_STATUS_OK).send();
    }
    catch (_a) {
        res.sendStatus(http2_1.constants.HTTP_STATUS_BAD_REQUEST);
    }
}));
favouriteRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teaId } = req.query;
    const client = req.user;
    yield (0, favouritesData_1.deleteFavouriteItem)({
        clientId: Number(client === null || client === void 0 ? void 0 : client.id),
        teaId: Number(teaId),
    });
    res.status(http2_1.constants.HTTP_STATUS_OK).send();
}));
favouriteRouter.get('/count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const count = yield (0, favouritesData_1.getFavouriteCount)(client === null || client === void 0 ? void 0 : client.id);
    res.json(count);
}));
exports.default = favouriteRouter;
