import express from 'express';
import cors from "cors";

import teasRouter from './controllers/teasController';
import filterRouter from './controllers/teasFilterControllers';

// import clientsRouter from './controllers/clientsController';
// import clientRouter from './controllers/clientsController';
// import cartRouter from './controllers/cartController';


const app = express();
app.use(cors())
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use('/teas', teasRouter)
app.use('/filter', filterRouter)
// clientsRouter.use('/:clientId', clientRouter);
// clientRouter.use('/cart', cartRouter);

// Подключаем к приложению
// app.use('/clients', clientsRouter);


const PORT = 8080;


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else{
        console.log(`started on http://localhost:${PORT}`)
    } 
})

