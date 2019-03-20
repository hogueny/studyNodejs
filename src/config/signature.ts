export const JWTConfig = {
    accessToken: {
        signature: "maetan",
        maxAge: "1h",
        subject: "accessToken"
    },
    refreshToken: {
        signature: "maetan3",
        maxAge: "1d",
        subject: "refreshToken"
    },
    algorithms: "HS256",
    issuer: "maetan"
}