import experss from 'express';
import { constants } from 'http2';

import { getClient, patchClient, deleteClient, postClient } from '../data/sql/clientsData';

const clientRouter = experss.Router({ mergeParams: true });

export const clientsRouter = experss.Router({ mergeParams: true });


clientRouter.get('/:clientId', async(req, res)=> {
    const id = Number(req.params.clientId);

    try{
        const client = await getClient(Number(id));
        res.json(client)
    } catch (err) {
        console.log(err);
        res.status(constants.HTTP_STATUS_NOT_FOUND).send('Server error')
    }
})



clientRouter.patch('/:clientId', async(req, res)=> {
    const { name = null, email = null, is_mailing = undefined } = req.body;
    const clientId = Number(req.params.clientId)
    await patchClient(clientId, name, email, is_mailing);
    res.status(constants.HTTP_STATUS_OK).send();
})


clientRouter.delete('/:clientId', async(req, res) => {
    const clientId = Number(req.params.clientId)
    await deleteClient(clientId);
    res.sendStatus(constants.HTTP_STATUS_OK)
})

clientRouter.post('/', async(req, res) => {
    const { name, email } = req.body;
    const result = await postClient(name, email)
    res.status(constants.HTTP_STATUS_OK).send(result)
})

export default clientRouter;