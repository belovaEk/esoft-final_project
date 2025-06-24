import  express  from "express";
import validator from 'express-validator';
import { constants } from 'http2';

import { getTeas } from "../data/teasData";

const teasRouter = express.Router();




teasRouter.get('/', async(req, res) =>{
    res.json(await getTeas())
    // res.json(await getTeas())
})


export default teasRouter;