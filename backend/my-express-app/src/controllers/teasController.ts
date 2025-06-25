import  express  from "express";
import validator from 'express-validator';
import { constants } from 'http2';

import { getTeas } from "../data/teasData";

import sql from "../data/sql/db";

const teasRouter = express.Router();




teasRouter.get('/', async(req, res) =>{
    // res.json(await getTeas())
    // // res.json(await getTeas())
     try {
        const teas = await sql
        `SELECT teas.*,
            types.name AS type_name,
            countries.name as country_name
        FROM teas
        JOIN types ON teas.type_id = types.id
        Join countries on teas.country_id = countries.id;`;
        res.json(teas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
  }
})


export default teasRouter;