import express from 'express';
import { constants } from 'http2';

import { getCart, patchCart, postCart, deleteCartItem } from '../data/sql/cartData';

const cartRouter = express.Router();


cartRouter.get('/:clientId', async(req, res) => {
    const clientId = Number(req.params.clientId);
    const cart = await getCart(clientId);
    res.json(cart)
})

cartRouter.patch('/', async(req, res) => {
    const { cartitem_id, newAmount } = req.body;
    await patchCart(Number(cartitem_id), Number(newAmount));
    res.status(constants.HTTP_STATUS_OK).send();
})

cartRouter.post('/', async(req, res) => {
    try{
        const { client_id, tea_id } = req.body;
        await postCart(Number(client_id), Number(tea_id));
        res.status(constants.HTTP_STATUS_CREATED).send();
    } catch(err) {
        res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
    }
    
})


cartRouter.delete('/', async(req, res) => {
    const {clientId, teaId}  = req.query;
    await deleteCartItem({
            clientId: Number(clientId),
            teaId: Number(teaId),
        });
        res.status(constants.HTTP_STATUS_OK).send()
})

export default cartRouter;
