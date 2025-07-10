import express from 'express';
import { constants } from 'http2';
import { client } from '../types/auth';

import { getCart, patchCart, postCart, deleteCartItem } from '../data/sql/cartData';

const cartRouter = express.Router();


cartRouter.get('/', async(req, res) => {
    const client = req.user as client
    const cart = await getCart(client?.id);
    res.json(cart)
})



cartRouter.patch('/', async(req, res) => {
    const client = req.user as client
    const { tea_id, newAmount } = req.body;
    await patchCart(Number(client?.id), Number(tea_id), Number(newAmount));
    res.status(constants.HTTP_STATUS_OK).send();
})

cartRouter.post('/', async(req, res) => {
    try{
        const { tea_id } = req.body;
        const client = req.user as client
        await postCart(Number(client?.id), Number(tea_id));
        res.status(constants.HTTP_STATUS_CREATED).send();
    } catch(err) {
        res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
    }
    
})


cartRouter.delete('/', async(req, res) => {
    const {teaId}  = req.query;
    const client = req.user as client
    await deleteCartItem({
            clientId: Number(client?.id),
            teaId: Number(teaId),
        });
        res.status(constants.HTTP_STATUS_OK).send()
})

export default cartRouter;
