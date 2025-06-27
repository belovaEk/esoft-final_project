import  express  from "express";

const teasRouter = express.Router();
import { getTeas } from "../data/sql/getTeasData";


teasRouter.get('/', async (req, res) => {
    const { sortBy, direction } = req.query;
    
    try {
        const teas = await getTeas({
            sortBy: sortBy as 'popular' | 'price' | undefined,
            direction: direction as 'ASC' | 'DESC' | undefined
        });
        res.json(teas);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





export default teasRouter;