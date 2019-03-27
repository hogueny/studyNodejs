"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const ErrorCode_1 = require("../config/ErrorCode");
const signature_1 = require("../config/signature");
exports.checkToken = (request, response, next) => {
    if (!request.headers.authorization) {
        console.log("token is undefined");
        return response.status(400).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: "authentication fail" });
    }
    try {
        const token = request.headers.authorization;
        console.log("token : ", token);
        // Decode
        // jwt.verify(token, secretOrPublicKey, [options, callback])
        const decode = jwt.verify(token, signature_1.JWTconfig.accessToken.signature, {
            algorithms: [signature_1.JWTconfig.algorithms],
            maxAge: signature_1.JWTconfig.accessToken.maxAge,
            issuer: signature_1.JWTconfig.issuer,
            subject: signature_1.JWTconfig.accessToken.subject
        });
        request.uuid = decode.uuid;
        console.log(`request : uuid : ${request.uuid}`);
        next();
    }
    catch (e) {
        console.error("token > error : ", e);
        if (e.message === "jwt expired") {
            return response.status(401).json({ code: ErrorCode_1.errorCode.tokenExpired, category: ErrorCode_1.category.security, message: e.message });
        }
        else {
            return response.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: e.message });
        }
    }
};
exports.refreshToken = (req, res, next) => {
    console.log("middleware refresh token");
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: "authentication fail" });
    }
    // Decode
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, signature_1.JWTconfig.refreshToken.signature, {
            algorithms: [signature_1.JWTconfig.algorithms],
            maxAge: signature_1.JWTconfig.refreshToken.maxAge,
            issuer: signature_1.JWTconfig.issuer,
            subject: signature_1.JWTconfig.refreshToken.subject
        });
        console.log("decoded : ", decoded);
        req.uuid = decoded.uuid;
        next();
    }
    catch (e) {
        console.error("refresh error : ", e.message);
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: ErrorCode_1.errorCode.tokenExpired, category: ErrorCode_1.category.security, message: e.message });
        }
        else {
            return res.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: e.message });
        }
    }
};
//# sourceMappingURL=token.js.map