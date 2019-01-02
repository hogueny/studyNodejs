//validation
import * as express from "express"
import * as jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { errorCode, category } from "../config/ErrorCode";
import { JWTconfig } from "../config/signature";
import { CustomRequest } from "../util/interface";

export const checkToken = (request:CustomRequest, response:Response, next:express.NextFunction) => {
    if(!request.headers.authorization){
        console.log("token is undefined");
        return response.status(400).json({code: errorCode.auth, category: category.security, message: "authentication fail"});
    }
    try {
        const token : string = request.headers.authorization;
        console.log("token : ",token);
    
        // Decode
        // jwt.verify(token, secretOrPublicKey, [options, callback])
        const decode : any = jwt.verify( 
        token,
        JWTconfig.accessToken.signature,
        {
            algorithms : [JWTconfig.algorithms],
            maxAge : JWTconfig.accessToken.maxAge,
            issuer : JWTconfig.issuer,
            subject : JWTconfig.accessToken.subject
        });
        request.uuid = decode.uuid;
        console.log(`request : uuid : ${request.uuid}`)
        next()
    }catch(e){
        console.error("token > error : ",e)
        if (e.message === "jwt expired"){
            return response.status(401).json({ code : errorCode.tokenExpired, category : category.security, message : e.message});
        }else{
            return response.status(401).json({ code : errorCode.auth, category : category.security, message : e.message});
        }
    }
}
export const refreshToken = (req: any, res: express.Response, next: express.NextFunction) => {
    console.log("middleware refresh token")
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: errorCode.auth, category: category.security, message: "authentication fail" });
    }
        // Decode
        // jwt.verify(token, secretOrPublicKey, [options, callback])
    try {
        const token: string = req.headers.authorization;
        const decoded: any = jwt.verify(
            token,
            JWTconfig.refreshToken.signature,
            {
                algorithms: [JWTconfig.algorithms],
                maxAge: JWTconfig.refreshToken.maxAge,
                issuer: JWTconfig.issuer,
                subject: JWTconfig.refreshToken.subject
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