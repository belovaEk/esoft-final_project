import experss from 'express';
import { constants } from 'http2';

import { getClient } from '../data/sql/getClientsData';

const clientRouter = experss.Router({ mergeParams: true });

export const clientsRouter = experss.Router({ mergeParams: true });


clientRouter.get('/:clientId', async(req, res)=> {
    const id = Number(req.params.clientId);

    try{
        const client = await getClient(id);
        res.json(client)
    } catch (err) {
        console.log(err);
        res.status(constants.HTTP_STATUS_NOT_FOUND).send('Server error')
    }
})


export default clientRouter;