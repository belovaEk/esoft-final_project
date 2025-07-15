import  express  from "express";

export function logger(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}