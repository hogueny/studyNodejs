"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTconfig = {
    accessToken: {
        signature: "maetan",
        maxAge: "1h",
        subject: "accessToken"
    },
    refreshToken: {
        signature: "maetan2",
        maxAge: "1d",
        subject: "refreshToken"
    },
    algorithms: "RS256",
    issuer: "maetan"
};
//# sourceMappingURL=signature.js.map