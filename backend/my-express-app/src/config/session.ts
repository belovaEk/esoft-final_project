import session from 'express-session';

export const configureSession = () => session({
    name: 'TeaTime.sid',
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Для localhost должно быть false
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 86400000 * 365 
    }
})