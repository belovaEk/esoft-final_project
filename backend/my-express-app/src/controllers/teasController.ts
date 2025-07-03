import  express  from "express";

const teasRouter = express.Router();
import { getTeas } from "../data/sql/getTeasData";
import { getTea } from "../data/sql/getTeasData";


teasRouter.get('/', async (req, res) => {
    const { clientId, sortBy, direction, typeIds, countryIds, minPrice, maxPrice, ingredientIds, tasteIds} = req.query;
    
    try {
        const teas = await getTeas({
            clientId: Number(clientId) || undefined,
            sortBy: sortBy as 'popular' | 'price' | undefined,
            direction: direction as 'ASC' | 'DESC' | undefined,
            typeIds: typeIds ? (typeIds as string).split(',').map(Number) : undefined,
            countryIds :  countryIds ? (countryIds as string).split(',').map(Number) : undefined,
            minPrice: Number(minPrice) || undefined,
            maxPrice: Number(maxPrice) || undefined,
            ingredientIds: ingredientIds ? (ingredientIds as string).split(',').map(Number) : undefined,
            tasteIds: tasteIds ? (tasteIds as string).split(',').map(Number) : undefined,

        });
        res.json(teas);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



teasRouter.get('/:teaId', async(req, res) => {
    const clientId = req.query.clientId
    const tea = await getTea(Number(req.params.teaId), Number(clientId) || undefined)
    res.json(tea)
})




export default teasRouter;