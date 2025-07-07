import  express  from "express";
import { constants } from 'http2';

export const orderRouter = express.Router();
import { getOrders, getprevPurchased,  createOrder} from "../data/sql/ordersData";



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

orderRouter.post('/', async(req, res) => {
   const { client_id, payment_method_id, shipping_address, delivery_method_id } = req.body;
    try{
        await createOrder(Number(client_id), Number(payment_method_id), shipping_address, Number(delivery_method_id));
        res.sendStatus(constants.HTTP_STATUS_CREATED)
    } catch {
        res.sendStatus(500)
    }
})