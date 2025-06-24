import express from 'express';
import logger from './logger';
import pinoHttp from 'pino-http';
 
import { loadData } from './data/fs/teasDataFs';

import teasRouter from './controllers/teasController';

const app = express();

app.use(express.json());
app.use(pinoHttp({logger, useLevel: 'debug'}));
app.use('/teas', teasRouter)
const PORT = 8080;


loadData().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            logger.error(err?.stack ?? err?.message ?? err)
        } else{
            logger.info(`started on http://localhost:${PORT}`)
        } 
    })
})
