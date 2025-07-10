import  express  from "express";
import { constants } from 'http2';
import { client } from "../types/auth";
export const orderRouter = express.Router();
import { getOrders, getprevPurchased,  createOrder} from "../data/sql/ordersData";



orderRouter.get('/', async(req, res)=> {
    const client = req.user as client
    const orders = await getOrders(Number(client?.id));
    res.json(orders)
})


orderRouter.get('/prevPurchased', async(req, res) =>{
    const client = req.user as client
    const teas = await getprevPurchased(Number(client?.id));
    res.json(teas)
})

orderRouter.post('/', async(req, res) => {
   const { payment_method_id, shipping_address, delivery_method_id } = req.body;
   const client = req.user as client
    try{
        await createOrder(Number(client?.id), Number(payment_method_id), shipping_address, Number(delivery_method_id));
        res.sendStatus(constants.HTTP_STATUS_CREATED)
    } catch {
        res.sendStatus(500)
    }
})