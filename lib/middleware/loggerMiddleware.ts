import express from "express";

export default function loggerMiddleware(req: express.Request, res: express.Response, next ){
    console.log(`${req.method} ${req.path}`)
    next();
}

