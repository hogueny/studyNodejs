import * as joi from "joi";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";

export const userSchema: joi.SchemaLike = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().required(),
    age: joi.number().min(1).required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required()
});


export const boardSchema: joi.SchemaLike = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    role: joi.string().required()
});

export const boardSchemaUpdate: joi.SchemaLike = joi.object().keys({
    name: joi.string().min(3).max(30).required(),
    role: joi.string().required()
});

export const messageSchema: joi.SchemaLike = joi.object().keys({
    title: joi.string().min(3).max(30).required(),
    contents: joi.string().required(),
    boardId: joi.number().required()
});

export const messageSchemaUpdate: joi.SchemaLike = joi.object().keys({
    title: joi.string().min(3).max(30),
    contents: joi.string(),
    boardId: joi.number().required()
});

export const checkValidation = (target: any, schema: joi.SchemaLike) => {
    console.log(`target : `, target);
    const result = joi.validate(target, schema);
    console.log("result : ", result.error);
    if (result.error) {
        throw new ErrorModel(400, errorCode.fieldValid, category.input, "not valid");
    }
}