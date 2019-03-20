"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContentType = (req, res, next) => {
    if (req.originalUrl.startsWith("/user/emailverify")) {
        return next();
    }
    const contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        console.log("application/json undefined");
        return res.sendStatus(400);
    }
    next();
};
//# sourceMappingURL=contentType.js.map