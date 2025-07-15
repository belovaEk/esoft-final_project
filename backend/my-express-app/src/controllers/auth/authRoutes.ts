import  express  from "express";

import passport from "passport";


export const authRouter = express.Router();


authRouter.get('/auth/google', passport.authenticate('google'));

authRouter.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: `${process.env.FRONTHOST}/catalog`
}));

authRouter.get('/auth/status', (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated(), client: req.user });
});

authRouter.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
})