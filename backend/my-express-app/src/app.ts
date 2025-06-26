import express from 'express';
 
import { loadData } from './data/fs/teasDataFs';

import teasRouter from './controllers/teasController';
import filterRouter from './controllers/teasFilterControllers';
const app = express();

app.use(express.json());
app.use('/teas', teasRouter)
app.use('/filter', filterRouter)
const PORT = 8080;


loadData().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
        } else{
           console.log(`started on http://localhost:${PORT}`)
        } 
    })
})
