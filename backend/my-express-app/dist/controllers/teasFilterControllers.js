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
const getTeasData_1 = require("../data/sql/getTeasData");
const filterRouter = express_1.default.Router();
filterRouter.get('/types', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const types = yield (0, getTeasData_1.getFilterOptions)('type');
    res.json(types);
}));
filterRouter.get('/countries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const types = yield (0, getTeasData_1.getFilterOptions)('country');
    res.json(types);
}));
filterRouter.get('/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield (0, getTeasData_1.getFilterOptions)('ingredient');
    res.json(ingredients);
}));
filterRouter.get('/tastes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tastes = yield (0, getTeasData_1.getFilterOptions)('taste');
    res.json(tastes);
}));
exports.default = filterRouter;
