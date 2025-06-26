import  express  from "express";
import validator from 'express-validator';
import { constants } from 'http2';
import type { sortedParamType } from "../data/sql/getTeasData";
import { getTea } from "../data/sql/getTeasData";


const teasRouter = express.Router();
import { getTeas } from "../data/sql/getTeasData";


teasRouter.get('/', async(req, res) =>{
     try {
        const teas = await getTeas();
        res.json(teas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})

teasRouter.get('/:id', async(req, res) =>{
    const id = Number(req.params.id)
    try{
        const tea = await getTea(id)
        res.json(tea);
    } catch (err) {
        console.log(err)
        res.status(constants.HTTP_STATUS_NOT_FOUND).send('Server error')
    }
})

teasRouter.get('/:sotedParam', async(req, res) => {
    const parametr = req.params.sotedParam as sortedParamType
    const teas = await getTeas(parametr)
    res.json(teas)
})





export default teasRouter;