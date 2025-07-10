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
exports.clientsRouter = void 0;
const express_1 = __importDefault(require("express"));
const http2_1 = require("http2");
const clientsData_1 = require("../data/sql/clientsData");
const clientRouter = express_1.default.Router({ mergeParams: true });
exports.clientsRouter = express_1.default.Router({ mergeParams: true });
clientRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const id = Number(client === null || client === void 0 ? void 0 : client.id);
    try {
        const client = yield (0, clientsData_1.getClient)(Number(id));
        res.json(client);
    }
    catch (err) {
        console.log(err);
        res.status(http2_1.constants.HTTP_STATUS_NOT_FOUND).send('Server error');
    }
}));
clientRouter.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const { name = null, email = null, is_mailing = undefined } = req.body;
    yield (0, clientsData_1.patchClient)(Number(client === null || client === void 0 ? void 0 : client.id), name, email, is_mailing);
    res.status(http2_1.constants.HTTP_STATUS_OK).send();
}));
clientRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    yield (0, clientsData_1.deleteClient)(Number(client === null || client === void 0 ? void 0 : client.id));
    res.sendStatus(http2_1.constants.HTTP_STATUS_OK);
}));
clientRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const result = yield (0, clientsData_1.postClient)(name, email);
    res.status(http2_1.constants.HTTP_STATUS_OK).send(result);
}));
exports.default = clientRouter;
