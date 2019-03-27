import * as joi from "joi";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode,category } from "../config/ErrorCode";

export const userSchema = joi.object().keys({
    name : joi.string().min(3).max(30).required(),
    password : joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age : joi.string().min(1).max(100),
    email : joi.string().email({minDomainAtoms:2}).required()
});

export const checkValidation = (target:any, schema:joi.SchemaLike) => {
    console.log('target : ',target);
    const result = joi.validate(target,schema);
    console.log("result : ",result.error);
    if(result.error){
        throw new ErrorModel(400,errorCode.fieldValid, category.input,"not valid");
    }
}