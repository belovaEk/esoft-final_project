import 'dotenv/config';
import cors from "cors";

export const configureCors = () => cors({
    origin: process.env.FRONTHOST,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})