import {NextFunction, Request, Response} from "express";

export const checkContentType = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith("/user/emailverify")) {
        return next()
    }
    const contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        console.log("application/json undefined");
        return res.sendStatus(400);
    }
    next();
};