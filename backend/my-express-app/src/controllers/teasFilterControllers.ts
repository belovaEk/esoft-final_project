import  express  from "express";

import { getTeasTypes } from "../data/sql/getTeasData";
import { getTeasCountries } from "../data/sql/getTeasData";
import { getTeasIngredients } from "../data/sql/getTeasData";
import { getTeasTastes } from "../data/sql/getTeasData";

const filterRouter = express.Router()

filterRouter.get('/types', async(req, res) => {
    const types = await getTeasTypes();
    res.json(types)
})

filterRouter.get('/countries', async(req, res) => {
    const types = await getTeasCountries();
    res.json(types)
})

filterRouter.get('/ingredients', async(req, res) => {
    const ingredients = await getTeasIngredients();
    res.json(ingredients)
})

filterRouter.get('/tastes', async(req, res) => {
    const tastes = await getTeasTastes();
    res.json(tastes)
})


export default filterRouter