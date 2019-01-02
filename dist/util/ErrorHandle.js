"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
exports.ErrorHandle = (req, res, e) => {
    if (e instanceof ErrorModel_1.ErrorModel) {
        return res.status(e["status"]).json({
            code: e["code"],
            category: e["category"],
            msg: e["msg"]
        });
    }
    else {
        return res.status(500).json({
            code: ErrorCode_1.errorCode.unknown,
            category: ErrorCode_1.category.unknown,
            msg: "server error"
        });
    }
};
//# sourceMappingURL=ErrorHandle.js.map