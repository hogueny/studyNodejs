import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { JWTConfig } from '../config/signature';

export const sign = (payload: {}, options: {}) => {
    return jwt.sign(payload, JWTConfig.accessToken.signature, options);
}

export const makeUserJWT = (user: User) => {
    return jwt.sign({uuid: user.uuid}, JWTConfig.accessToken.signature, {
        issuer: JWTConfig.issuer,
        subject: JWTConfig.accessToken.subject,
        expiresIn: JWTConfig.accessToken.maxAge
    });
}

export const makeUserRefreshJWT = (user: User) => {
    return jwt.sign({uuid: user.uuid}, JWTConfig.refreshToken.signature, {
        issuer: JWTConfig.issuer,
        subject: JWTConfig.refreshToken.subject,
        expiresIn: JWTConfig.refreshToken.maxAge
    });
}