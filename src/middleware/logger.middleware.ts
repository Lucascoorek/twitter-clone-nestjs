import { Request, Response, NextFunction } from 'express';


export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, "to:", req.path, "at:", new Date(Date.now()).toString());
    next();
};