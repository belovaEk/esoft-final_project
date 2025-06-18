import express from 'express'
import { constants } from 'http2';
 
import { loadData } from './services/TeaStorage.service';

import teaRouter from './routes/teaProducts';

const app = express();

app.use(express.json());

app.use('/products', teaRouter)
const PORT = 8080;


loadData().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен http://localhost:${PORT}`)
    })
})
