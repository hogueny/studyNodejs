"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//make Token
const jwt = require("jsonwebtoken");
const signature_1 = require("../config/signature");
exports.sign = (payload, option) => {
    return jwt.sign(payload, signature_1.JWTconfig.accessToken.signature, option); // jwt.sign(payloac, secretOrPrivateKey, option)
};
/*
jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: '1h' });

  data : uuid , secret : signature , expiresIn : maxAge

*/
exports.makeUserJWT = (user) => {
    return jwt.sign({ uuid: user.uuid }, signature_1.JWTconfig.accessToken.signature, {
        issuer: signature_1.JWTconfig.issuer,
        subject: signature_1.JWTconfig.accessToken.subject,
        expiresIn: signature_1.JWTconfig.accessToken.maxAge
    });
};
exports.makeUserRefreshJWT = (user) => {
    return jwt.sign({ uuid: user.uuid }, signature_1.JWTconfig.refreshToken.signature, {
        issuer: signature_1.JWTconfig.issuer,
        subject: signature_1.JWTconfig.refreshToken.subject,
        expiresIn: signature_1.JWTconfig.refreshToken.maxAge
    });
};
//# sourceMappingURL=jwt.js.map