import express from 'express';
import { constants } from 'http2';

import { getFavourites, deleteFavouriteItem, postFavouriteItem, getFavouriteCount } from '../data/sql/favouritesData';
import { cookieClient } from './auth/types';

export const favouriteRouter = express.Router();


favouriteRouter.get('/', async(req, res) => {
    const client = req.user as cookieClient
    const cart = await getFavourites(client?.id);
    res.json(cart)
})

favouriteRouter.post('/', async(req, res) => {
    const { tea_id } = req.body;
    const client = req.user as cookieClient
    try{
        await postFavouriteItem(Number(client?.id), Number(tea_id));
        res.status(constants.HTTP_STATUS_OK).send();
    } catch {
        res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST)
    }
    
})


favouriteRouter.delete('/', async(req, res) => {
    const {teaId}  = req.query;
    const client = req.user as cookieClient
    await deleteFavouriteItem({
        clientId: Number(client?.id),
        teaId: Number(teaId),
    });
    res.status(constants.HTTP_STATUS_OK).send()
})


favouriteRouter.get('/count', async(req, res) => {
    const client = req.user as cookieClient
    const count = await getFavouriteCount(client?.id)
    res.json(count)
})