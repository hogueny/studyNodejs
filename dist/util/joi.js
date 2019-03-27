"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
exports.userSchema = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age: joi.string().min(1).max(100),
    email: joi.string().email({ minDomainAtoms: 2 }).required()
});
exports.checkValidation = (target, schema) => {
    console.log('target : ', target);
    const result = joi.validate(target, schema);
    console.log("result : ", result.error);
    if (result.error) {
        throw new ErrorModel_1.ErrorModel(400, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "not valid");
    }
};
//# sourceMappingURL=joi.js.map