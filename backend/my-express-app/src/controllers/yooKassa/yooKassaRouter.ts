import  express from "express";
import { createPayment } from "./yooKassaService";

export const yooKassaRouter = express.Router();

yooKassaRouter.post('/create-payment', async(req, res) => {
    const { amount } = req.body
    const payment = await createPayment(amount)
    res.send(payment.confirmation.confirmation_url)
})
