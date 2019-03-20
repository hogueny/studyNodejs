"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
exports.userSchema = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().required(),
    age: joi.number().min(1).required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required()
});
exports.boardSchema = joi.object().keys({
    name: joi.string().min(3).max(30).required()
});
exports.boardSchemaUpdate = joi.object().keys({
    name: joi.string().min(3).max(30).required()
});
exports.messageSchema = joi.object().keys({
    title: joi.string().min(3).max(30).required(),
    contents: joi.string().required(),
    boardId: joi.number().required()
});
exports.messageSchemaUpdate = joi.object().keys({
    title: joi.string().min(3).max(30),
    contents: joi.string(),
    boardId: joi.number().required()
});
exports.checkValidation = (target, schema) => {
    console.log(`target : `, target);
    const result = joi.validate(target, schema);
    console.log("result : ", result.error);
    if (result.error) {
        throw new ErrorModel_1.ErrorModel(400, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "not valid");
    }
};
//# sourceMappingURL=joi.js.map