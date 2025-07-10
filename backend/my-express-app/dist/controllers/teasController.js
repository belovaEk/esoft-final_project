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
const teasRouter = express_1.default.Router();
const getTeasData_1 = require("../data/sql/getTeasData");
const getTeasData_2 = require("../data/sql/getTeasData");
teasRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, direction, typeIds, countryIds, minPrice, maxPrice, ingredientIds, tasteIds } = req.query;
    const client = req.user;
    try {
        const teas = yield (0, getTeasData_1.getTeas)({
            clientId: Number(client === null || client === void 0 ? void 0 : client.id) || undefined,
            sortBy: sortBy,
            direction: direction,
            typeIds: typeIds ? typeIds.split(',').map(Number) : undefined,
            countryIds: countryIds ? countryIds.split(',').map(Number) : undefined,
            minPrice: Number(minPrice) || undefined,
            maxPrice: Number(maxPrice) || undefined,
            ingredientIds: ingredientIds ? ingredientIds.split(',').map(Number) : undefined,
            tasteIds: tasteIds ? tasteIds.split(',').map(Number) : undefined,
        });
        res.json(teas);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
teasRouter.get('/:teaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.user;
    const tea = yield (0, getTeasData_2.getTea)(Number(req.params.teaId), Number(client === null || client === void 0 ? void 0 : client.id) || undefined);
    res.json(tea);
}));
exports.default = teasRouter;
