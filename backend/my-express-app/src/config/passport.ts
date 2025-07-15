import passport from "passport";
import { configureGoogleStrategy } from "../controllers/auth/strategies/googleStrategy";
import { getUser } from "../data/sql/auth";


export const configurePassport = () => {
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

    passport.use(configureGoogleStrategy());

    return passport;
};