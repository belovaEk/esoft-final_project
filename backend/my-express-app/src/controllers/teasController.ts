import  express  from "express";

export const teasRouter = express.Router();
import { getTeas } from "../data/sql/getTeasData";
import { getTea } from "../data/sql/getTeasData";
import { cookieClient } from "./auth/types";

teasRouter.get('/', async (req, res) => {
    const {  sortBy, direction, typeIds, countryIds, minPrice, maxPrice, ingredientIds, tasteIds, search } = req.query;
    const client = req.user as cookieClient
    try {
        const teas = await getTeas({
            clientId: Number(client?.id) || undefined,
            sortBy: sortBy as 'popular' | 'price' | undefined,
            direction: direction as 'ASC' | 'DESC' | undefined,
            typeIds: typeIds ? (typeIds as string).split(',').map(Number) : undefined,
            countryIds :  countryIds ? (countryIds as string).split(',').map(Number) : undefined,
            minPrice: Number(minPrice) || undefined,
            maxPrice: Number(maxPrice) || undefined,
            ingredientIds: ingredientIds ? (ingredientIds as string).split(',').map(Number) : undefined,
            tasteIds: tasteIds ? (tasteIds as string).split(',').map(Number) : undefined,
            search: search ? String(search) : undefined,
        });
        res.json(teas);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



teasRouter.get('/:teaId', async(req, res) => {
    const client = req.user as cookieClient
    const tea = await getTea(Number(req.params.teaId), Number(client?.id) || undefined)
    res.json(tea)
})
