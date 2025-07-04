import express from 'express';
import { constants } from 'http2';

import { getFavourites, deleteFavouriteItem, postFavouriteItem, getFavouriteCount } from '../data/sql/favouritesData';

const favouriteRouter = express.Router();


favouriteRouter.get('/:clientId', async(req, res) => {
    const clientId = Number(req.params.clientId);
    const cart = await getFavourites(clientId);
    res.json(cart)
})

favouriteRouter.post('/', async(req, res) => {
    const { client_id, tea_id } = req.body;
    try{
        await postFavouriteItem(Number(client_id), Number(tea_id));
        res.status(constants.HTTP_STATUS_OK).send();
    } catch {
        res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
    }
    
})


favouriteRouter.delete('/', async(req, res) => {
    const {clientId, teaId}  = req.query;
    await deleteFavouriteItem({
        clientId: Number(clientId),
        teaId: Number(teaId),
    });
    res.status(constants.HTTP_STATUS_OK).send()
})


favouriteRouter.get('/:clientId/count', async(req, res) => {
    const clientId = Number(req.params.clientId)
    const count = await getFavouriteCount(clientId)
    res.json(count)
})

export default favouriteRouter;
