import experss from 'express';
import { constants } from 'http2';

import { getClient, patchClient, deleteClient, postClient } from '../data/sql/clientsData';
import { client } from '../types/auth';
const clientRouter = experss.Router({ mergeParams: true });

export const clientsRouter = experss.Router({ mergeParams: true });


clientRouter.get('/', async(req, res)=> {
    const client = req.user as client
    const id = Number(client?.id);
    try{
        const client = await getClient(Number(id));
        res.json(client)
    } catch (err) {
        console.log(err);
        res.status(constants.HTTP_STATUS_NOT_FOUND).send('Server error')
    }
})



clientRouter.patch('/', async(req, res)=> {
    const client = req.user as client
    const { name = null, email = null, is_mailing = undefined } = req.body;
    await patchClient(Number(client?.id), name, email, is_mailing);
    res.status(constants.HTTP_STATUS_OK).send();
})


clientRouter.delete('/', async(req, res) => {
    const client = req.user as client
    await deleteClient(Number(client?.id));
    res.sendStatus(constants.HTTP_STATUS_OK)
})

clientRouter.post('/', async(req, res) => {
    const { name, email } = req.body;
    const result = await postClient(name, email)
    res.status(constants.HTTP_STATUS_OK).send(result)
})

export default clientRouter;