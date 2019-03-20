"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const signature_1 = require("../config/signature");
exports.sign = (payload, options) => {
    return jwt.sign(payload, signature_1.JWTConfig.accessToken.signature, options);
};
exports.makeUserJWT = (user) => {
    return jwt.sign({ uuid: user.uuid }, signature_1.JWTConfig.accessToken.signature, {
        issuer: signature_1.JWTConfig.issuer,
        subject: signature_1.JWTConfig.accessToken.subject,
        expiresIn: signature_1.JWTConfig.accessToken.maxAge
    });
};
exports.makeUserRefreshJWT = (user) => {
    return jwt.sign({ uuid: user.uuid }, signature_1.JWTConfig.refreshToken.signature, {
        issuer: signature_1.JWTConfig.issuer,
        subject: signature_1.JWTConfig.refreshToken.subject,
        expiresIn: signature_1.JWTConfig.refreshToken.maxAge
    });
};
//# sourceMappingURL=jwt.js.map