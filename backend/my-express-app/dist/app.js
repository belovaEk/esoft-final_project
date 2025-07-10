"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
var GoogleStrategy = require('passport-google-oidc');
const teasController_1 = __importDefault(require("./controllers/teasController"));
const teasFilterControllers_1 = __importDefault(require("./controllers/teasFilterControllers"));
const cartController_1 = __importDefault(require("./controllers/cartController"));
const favoutitesController_1 = __importDefault(require("./controllers/favoutitesController"));
const orederController_1 = require("./controllers/orederController");
const clientsController_1 = __importDefault(require("./controllers/clientsController"));
const auth_1 = require("./data/sql/auth");
const clientsData_1 = require("./data/sql/clientsData");
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.SESSION_SECRET) {
    throw new Error('Missing required environment variables');
}
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_1.getUser)(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
}, function verify(issuer, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
        try {
            const cred = yield (0, auth_1.getFederatedCredentials)(issuer, profile.id);
            if (!cred) {
                const newClientId = yield (0, clientsData_1.postClient)(profile.displayName, email);
                yield (0, auth_1.createFederatedCredentials)(newClientId, issuer, profile.id);
                return cb(null, {
                    id: newClientId,
                    name: profile.displayName,
                    email: email
                });
            }
            else {
                const user = yield (0, auth_1.getUser)(cred.client_id);
                console.log(user);
                return cb(null, user || false);
            }
        }
        catch (err) {
            return cb(err);
        }
    });
}));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Для localhost должно быть false
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 86400000 * 365
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/auth/google', passport_1.default.authenticate('google'));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:5173/'
}));
app.get('/auth/status', (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated(), client: req.user });
});
function ensureAuthenticated(req, res, next) {
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
app.use('/teas', teasController_1.default);
app.use('/filter', teasFilterControllers_1.default);
app.use('/cart', cartController_1.default);
app.use('/orders', orederController_1.orderRouter);
app.use('/client', clientsController_1.default);
app.use('/favourites', favoutitesController_1.default);
const PORT = 8080;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`started on http://localhost:${PORT}`);
    }
});
