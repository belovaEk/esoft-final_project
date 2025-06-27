import  express  from "express";


import { getFilterOptions } from "../data/sql/getTeasData";

const filterRouter = express.Router()

filterRouter.get('/types', async(req, res) => {
    const types = await getFilterOptions('types');
    res.json(types)
})

filterRouter.get('/countries', async(req, res) => {
    const types = await getFilterOptions('countries');
    res.json(types)
})

filterRouter.get('/ingredients', async(req, res) => {
    const ingredients = await getFilterOptions('ingredients');
    res.json(ingredients)
})

filterRouter.get('/tastes', async(req, res) => {
    const tastes = await getFilterOptions('tastes');
    res.json(tastes)
})


export default filterRouter