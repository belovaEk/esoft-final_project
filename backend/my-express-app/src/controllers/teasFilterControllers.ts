import  express  from "express";


import { getFilterOptions } from "../data/sql/getTeasData";

const filterRouter = express.Router()

filterRouter.get('/types', async(req, res) => {
    const types = await getFilterOptions('type');
    res.json(types)
})

filterRouter.get('/countries', async(req, res) => {
    const types = await getFilterOptions('country');
    res.json(types)
})

filterRouter.get('/ingredients', async(req, res) => {
    const ingredients = await getFilterOptions('ingredient');
    res.json(ingredients)
})

filterRouter.get('/tastes', async(req, res) => {
    const tastes = await getFilterOptions('taste');
    res.json(tastes)
})


export default filterRouter