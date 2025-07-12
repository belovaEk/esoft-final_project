import 'dotenv/config';

import express from 'express';
import cors from "cors";
import passport from 'passport';
import session from 'express-session';

var GoogleStrategy = require('passport-google-oidc');

import teasRouter from './controllers/teasController';
import filterRouter from './controllers/teasFilterControllers';
import cartRouter from './controllers/cartController';
import favouriteRouter from './controllers/favoutitesController';
import { orderRouter } from './controllers/orederController';
import clientRouter from './controllers/clientsController';

import { getFederatedCredentials, createFederatedCredentials, getUser } from './data/sql/auth';
import { getClient, postClient } from './data/sql/clientsData';
import { getTeas } from './data/sql/getTeasData';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.SESSION_SECRET || !process.env.FRONTHOST || !process.env.PORT) {
    throw new Error('Missing required environment variables');
}
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await getUser(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

interface GoogleProfile {
    id: string;
    displayName: string;
    emails: { value: string }[];
}


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
    },

    async function verify(issuer: string, profile: GoogleProfile, cb: (error: any, user?: any) => void) {
        const email = profile.emails?.[0]?.value;
        try {
                const cred = await getFederatedCredentials(issuer, profile.id);
            
                if (!cred) {    
                    const newClientId = await postClient(profile.displayName, email);
                    await createFederatedCredentials(newClientId, issuer, profile.id)
                    return cb(null, {
                        id: newClientId,
                        name: profile.displayName,
                        email: email
                    });
                } else {
                    const user = await getUser(cred.client_id);
                    console.log(user)
                    return cb(null, user || false);
                }
        } catch (err) {
            return cb(err);
        }
    }
));


const app = express();



app.use(cors({
    origin: process.env.FRONTHOST,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Для localhost должно быть false
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 86400000 * 365 
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: `${process.env.FRONTHOST}/catalog`
  })
);


app.get('/auth/status', (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated(), client: req.user });
});




function ensureAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
}

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


app.use('/teas', teasRouter);
app.use('/filter', filterRouter);
app.use('/cart', ensureAuthenticated, cartRouter);
app.use('/orders', ensureAuthenticated, orderRouter);
app.use('/client',  ensureAuthenticated, clientRouter);
app.use('/favourites',  ensureAuthenticated, favouriteRouter)


const PORT = process.env.PORT;


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else{
        console.log(`started on http://localhost:${PORT}`)
    } 
})