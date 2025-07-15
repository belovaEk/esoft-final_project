import 'dotenv/config';

import express from 'express';

import {teasRouter} from './controllers/teasController';
import {filterRouter} from './controllers/teasFilterControllers';
import {cartRouter} from './controllers/cartController';
import {favouriteRouter} from './controllers/favoutitesController';
import { orderRouter } from './controllers/orederController';
import {clientRouter} from './controllers/clientsController';
import { authRouter } from './controllers/auth/authRoutes';
import { configurePassport } from './config/passport';
import { configureSession } from './config/session';
import { configureCors } from './config/cors';
import { ensureAuthenticated } from './middlewares/auth';
import { logger } from './middlewares/logger';
import { ensureEnv } from './config/env';

const app = express();

ensureEnv()

// Middleware
app.use(configureCors());
app.use(logger);
app.use(express.json());

// Настройка сессии
app.use(configureSession());

// Настройка paspport 
const passport = configurePassport()
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

app.use('/teas', teasRouter);
app.use('/filter', filterRouter);
app.use('/cart', ensureAuthenticated, cartRouter);
app.use('/orders', ensureAuthenticated, orderRouter);
app.use('/client',  ensureAuthenticated, clientRouter);
app.use('/favourites',  ensureAuthenticated, favouriteRouter)


export { app };