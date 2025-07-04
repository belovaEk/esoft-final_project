import  express  from "express";

export const orderRouter = express.Router();
import { getOrders, getprevPurchased } from "../data/sql/ordersData";



orderRouter.get('/:clientId', async(req, res)=> {
    const clientId = Number(req.params.clientId);
    const orders = await getOrders(clientId);
    res.json(orders)
})


orderRouter.get('/:clientId/prevPurchased', async(req, res) =>{
    const clientId = Number(req.params.clientId);
    const teas = await getprevPurchased(clientId);
    res.json(teas)
})