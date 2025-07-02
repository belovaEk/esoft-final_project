import express from 'express';
import { constants } from 'http2';

import { getCart } from '../data/sql/cartData';
import { postCart } from '../data/sql/cartData';
import { deleteCartItem } from '../data/sql/cartData';

const cartRouter = express.Router();


cartRouter.get('/:clientId', async(req, res) => {
    const clientId = Number(req.params.clientId);
    const cart = await getCart(clientId);
    res.json(cart)
})

cartRouter.post('/', async(req, res) => {
    const { cartitem_id, newAmount } = req.body;
    await postCart(Number(cartitem_id), Number(newAmount));
    res.status(constants.HTTP_STATUS_OK).send();
})


cartRouter.delete('/:cartItemId', async(req, res) => {
    const cartItemId  = req.params.cartItemId;
    await deleteCartItem(Number(cartItemId));
    res.status(constants.HTTP_STATUS_OK).send()
})

export default cartRouter;
