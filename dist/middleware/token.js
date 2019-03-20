"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const signature_1 = require("../config/signature");
const ErrorCode_1 = require("../config/ErrorCode");
exports.checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: "authentication fail" });
    }
    try {
        const token = req.headers.authorization;
        console.log("token : ", token);
        const decoded = jwt.verify(token, signature_1.JWTConfig.accessToken.signature, {
            algorithms: [signature_1.JWTConfig.algorithms],
            maxAge: signature_1.JWTConfig.accessToken.maxAge,
            issuer: signature_1.JWTConfig.issuer,
            subject: signature_1.JWTConfig.accessToken.subject
        });
        // if (!decoded.isVerifiedEmail) {
        // return res.status(401).json({ code: errorCode.auth, category: category.security, message: "email is not verified" });
        // }
        req.uuid = decoded.uuid;
        console.log(`req.uuid > ${req.uuid}`);
        next();
    }
    catch (e) {
        console.error("token > error :", e);
        if (e.message === "jwt expired") {
            return res.status(401).json({ code: ErrorCode_1.errorCode.tokenExpired, category: ErrorCode_1.category.security, message: e.message });
        }
        else {
            return res.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: e.message });
        }
    }
};
exports.refreshToken = (req, res, next) => {
    console.log("middleware refresh token");
    if (!req.headers.authorization) {
        console.log("token undefined");
        return res.status(401).json({ code: ErrorCode_1.errorCode.auth, category: ErrorCode_1.category.security, message: "authentication fail" });
    }
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, signature_1.JWTConfig.refreshToken.signature, {
            algorithms: [signature_1.JWTConfig.algorithms],
            maxAge: signature_1.JWTConfig.refreshToken.maxAge,
            issuer: signature_1.JWTConfig.issuer,
            subject: signature_1.JWTConfig.refreshToken.subject
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