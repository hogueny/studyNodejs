//make Token
import * as jwt from 'jsonwebtoken';
import { JWTconfig } from "../config/signature";
import { User } from '../entity/User';

export const sign = (payload: {}, option: {}) => {
    return jwt.sign(payload, JWTconfig.accessToken.signature, option);  // jwt.sign(payloac, secretOrPrivateKey, option)
}
/*
jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: '1h' });

  data : uuid , secret : signature , expiresIn : maxAge

*/
export const makeUserJWT = (user : User) => {
    return jwt.sign({uuid : user.uuid}, JWTconfig.accessToken.signature, {
        issuer: JWTconfig.issuer,
        subject: JWTconfig.accessToken.subject,
        expiresIn: JWTconfig.accessToken.maxAge
    });
}
export const makeUserRefreshJWT = (user: User) => {
    return jwt.sign({uuid : user.uuid}, JWTconfig.refreshToken.signature,{
        issuer: JWTconfig.issuer,
        subject: JWTconfig.refreshToken.subject,
        expiresIn: JWTconfig.refreshToken.maxAge
    });
}
