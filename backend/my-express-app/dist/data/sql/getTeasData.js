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
exports.getTeas = getTeas;
exports.getFilterOptions = getFilterOptions;
exports.getTea = getTea;
const db_1 = __importDefault(require("./db"));
function getTeas(options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let query = (0, db_1.default) `
        SELECT tea.*,
               type.name AS type_name,
               country.name as country_name,
               CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
               CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
        FROM tea
        JOIN type ON tea.type_id = type.id
        JOIN country ON tea.country_id = country.id
        LEFT JOIN favourite fav ON tea.id = fav.tea_id AND fav.client_id = ${(options === null || options === void 0 ? void 0 : options.clientId) || 0}
        LEFT JOIN cart ON tea.id = cart.tea_id AND cart.client_id = ${(options === null || options === void 0 ? void 0 : options.clientId) || 0}
        WHERE 1=1
    `;
        if ((_a = options === null || options === void 0 ? void 0 : options.typeIds) === null || _a === void 0 ? void 0 : _a.length) {
            query = (0, db_1.default) `${query} AND tea.type_id IN ${(0, db_1.default)(options.typeIds)}`;
        }
        if ((_b = options === null || options === void 0 ? void 0 : options.countryIds) === null || _b === void 0 ? void 0 : _b.length) {
            query = (0, db_1.default) `${query} AND tea.country_id IN ${(0, db_1.default)(options.countryIds)}`;
        }
        if (options === null || options === void 0 ? void 0 : options.minPrice) {
            query = (0, db_1.default) `${query} AND tea.price >= ${Number(options.minPrice)}`;
        }
        if (options === null || options === void 0 ? void 0 : options.maxPrice) {
            query = (0, db_1.default) `${query} AND tea.price <= ${Number(options.maxPrice)}`;
        }
        if ((_c = options === null || options === void 0 ? void 0 : options.ingredientIds) === null || _c === void 0 ? void 0 : _c.length) {
            query = (0, db_1.default) `${query} and tea.id in (
                select tea_id from tea_ingredient
                where ingredient_id in ${(0, db_1.default)(options.ingredientIds)}
            )`;
        }
        if ((_d = options === null || options === void 0 ? void 0 : options.tasteIds) === null || _d === void 0 ? void 0 : _d.length) {
            query = (0, db_1.default) `${query} and tea.id in (
                select tea_id from tea_taste
                where taste_id in ${(0, db_1.default)(options.tasteIds)}
            )`;
        }
        if (options === null || options === void 0 ? void 0 : options.sortBy) {
            const orderBy = options.sortBy === 'popular' ? (0, db_1.default) `orders` : (0, db_1.default) `price`;
            const direction = options.direction === 'ASC' ? (0, db_1.default) `ASC` : (0, db_1.default) `DESC`;
            query = (0, db_1.default) `${query} ORDER BY ${orderBy} ${direction}`;
        }
        return yield query;
    });
}
function getFilterOptions(table) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, db_1.default) `SELECT id, name FROM ${(0, db_1.default)(table)} ORDER BY name`;
    });
}
function getTea(id, clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        let teaQuery = (0, db_1.default) `
        SELECT tea.*,
               type.name AS type_name,
               country.name as country_name,
            CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
            CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
        FROM tea
        JOIN type ON tea.type_id = type.id
        JOIN country ON tea.country_id = country.id
        LEFT JOIN favourite fav ON tea.id = fav.tea_id AND fav.client_id = ${clientId || 0}
        LEFT JOIN cart ON tea.id = cart.tea_id AND cart.client_id = ${clientId || 0}
        WHERE tea.id = ${id}
    `;
        let ingredientsQuery = (0, db_1.default) `SELECT *
    FROM 
        tea_ingredient
    JOIN 
        ingredient ON ingredient.id = tea_ingredient.ingredient_id
    WHERE 
        tea_ingredient.tea_id = ${id};`;
        let tastesQuery = (0, db_1.default) `select *
    from tea_taste
    join taste on taste.id = tea_taste.taste_id
    where tea_taste.tea_id = ${id};`;
        const [tea, ingredients, tastes] = yield Promise.all([
            teaQuery,
            ingredientsQuery,
            tastesQuery
        ]);
        return Object.assign(Object.assign({}, tea[0]), { ingredients: ingredients.map(i => i.name), tastes: tastes.map(t => t.name) });
    });
}
