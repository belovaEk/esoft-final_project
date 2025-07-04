import express from 'express';
import cors from "cors";

import teasRouter from './controllers/teasController';
import filterRouter from './controllers/teasFilterControllers';
import cartRouter from './controllers/cartController';
import favouriteRouter from './controllers/favoutitesController';
import { orderRouter } from './controllers/orederController';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use('/teas', teasRouter);
app.use('/filter', filterRouter);
app.use('/cart', cartRouter);
app.use('/favourites', favouriteRouter);
app.use('/orders', orderRouter)


const PORT = 8080;


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else{
        console.log(`started on http://localhost:${PORT}`)
    } 
})

