import experss from 'express';
import { constants } from 'http2';

import { getClient, patchClient, deleteClient, postClient } from '../data/sql/clientsData';
import { cookieClient } from './auth/types';
export const clientRouter = experss.Router({ mergeParams: true });

export const clientsRouter = experss.Router({ mergeParams: true });


clientRouter.get('/', async(req, res)=> {
    const client = req.user as cookieClient
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
    const client = req.user as cookieClient
    const { name = null, is_mailing = undefined } = req.body;
    await patchClient(Number(client?.id), name, is_mailing);
    res.status(constants.HTTP_STATUS_OK).send();
})


clientRouter.delete('/', async(req, res) => {
    const client = req.user as cookieClient
    await deleteClient(Number(client?.id));
    req.session.destroy((err) => {
       if (err) {
         console.log(err);
       } else {
         // Сессия успешно удалена
       }
     });
     res.clearCookie('TeaTime.side')
    res.sendStatus(constants.HTTP_STATUS_OK)
})

clientRouter.post('/', async(req, res) => {
    const { name, email } = req.body;
    const result = await postClient(name, email)
    res.status(constants.HTTP_STATUS_OK).send(result)
})
