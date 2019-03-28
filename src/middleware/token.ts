import * as express from "express";
import * as jwt from "jsonwebtoken";
import { JWTConfig } from "../config/signature";
import { errorCode, category } from "../config/ErrorCode";
import { CustomRequest } from "../util/interface";

export const checkToken = (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: errorCode.auth, category: category.security, message: "authentication fail" });
    }
    try {
        const token: string = req.headers.authorization;
        console.log("token : ", token);
        const decoded: any = jwt.verify(
            token,
            JWTConfig.accessToken.signature,
            {
                algorithms: [JWTConfig.algorithms],
                maxAge: JWTConfig.accessToken.maxAge,
                issuer: JWTConfig.issuer,
                subject: JWTConfig.accessToken.subject
            });
        // if (!decoded.isVerifiedEmail) {
            // return res.status(401).json({ code: errorCode.auth, category: category.security, message: "email is not verified" });
        // }
        req.uuid = decoded.uuid;
        console.log(`req.uuid > ${req.uuid}`)
        next()
    } catch (e) {
        console.error("token > error :", e)
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: errorCode.tokenExpired, category: category.security, message: e.message })
        } else {
            return res.status(401).json({ code: errorCode.auth, category: category.security, message: e.message });
        }
    }
};

export const refreshToken = (req: any, res: express.Response, next: express.NextFunction) => {
    console.log("middleware refresh token")
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: errorCode.auth, category: category.security, message: "authentication fail" });
    }

    try {
        const token: string = req.headers.authorization;
        const decoded: any = jwt.verify(
            token,
            JWTConfig.refreshToken.signature,
            {
                algorithms: [JWTConfig.algorithms],
                maxAge: JWTConfig.refreshToken.maxAge,
                issuer: JWTConfig.issuer,
                subject: JWTConfig.refreshToken.subject
            });
        console.log("decoded : ", decoded);
        req.uuid = decoded.uuid;
        next()
    } catch (e) {
        console.error("refresh error : ", e.message)
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: errorCode.tokenExpired, category: category.security, message: e.message })
        } else {
            return res.status(401).json({ code: errorCode.auth, category: category.security, message: e.message });
        }
    }

};