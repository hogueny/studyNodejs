// 유저생성, 모든유저정보, 이메일로 유저정보찾기, 유저수정, 유저삭제, 로그인, 토큰생성, 토큰갱신
import { Request, Response } from "express";
import { User } from "../entity/User";
import { compare } from "bcrypt";
import * as bcrypt from "bcrypt"; // compare, hash....
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";
import { makeUserJWT, makeUserRefreshJWT } from "../util/jwt";
import { ErrorHandle } from "../util/ErrorHandle";
import { NextFunction } from "connect";
import { CustomRequest } from "../util/interface";
import { checkValidation, userSchema } from "../util/joi";
import { bcryptConfig } from "../config/Bcrypt";
import { request } from "https";
import { func } from "joi";

export async function userCreateAction(request:Request, response:Response){
    try{
        console.log("requset body",request.body);
        console.log("Insert data");
        checkValidation(request.body, userSchema);

        let user = new User();
        user.name = request.body.name === undefined ? "" : request.body.name;
        user.password = await bcrypt.hash(request.body.password, bcryptConfig.salt);
        //user.name = request.body.name;
        //user.password = request.body.password;
        user.age = request.body.age;
        user.email = request.body.email;
        user.role = "nomal";
        user.regDate = new Date();
        user.modDate = new Date();

        const result = await User.save(user);
        console.log("User Data Saved");
        
        delete user.password;
        response.status(201).json(result);

    }catch(e){
        console.error("Create error is : ",e);
        ErrorHandle(request, response, e);
    }
}

export async function userGetAllAction(request : Request, response : Response){
    try{
        const users = await User.find();
        console.log("All users");
        response.status(200).json(users);
    }catch(e){
        console.error("userGetAllAction is error : ",e)
        ErrorHandle(request,response,e);
    }
}

export async function userGetByEmailAction(request : Request, response : Response){
    try{
        const user = await User.findOne(request.body.email);
        if(!user){
            throw new ErrorModel(404, errorCode.notFound, category.input,"user not found");
        }
        console.log("Search by Email = ",user.email);
        response.status(200).json(user);
    }catch(e){
        console.log("userGetByEmailAction is Error : ",e)
        ErrorHandle(request,response,e);
    }
}

export async function userLogin(request:Request, response:Response){
    try{
        const email : string = request.body.email;
        const password : string = request.body.password;

        const user : User = await User.findOne({
            where:{
                email: email
            }
        });
        if(!user){
            throw console.log('User is not found');
        }

        const result : boolean = await compare(password,user.password);
        if(!result){
            throw new ErrorModel(401, errorCode.fieldValid, category.input,"password not valid");
        }
        const accessToken = makeUserJWT(user);
        const refreshToken = makeUserRefreshJWT(user);
        response.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }catch(e){
        console.error("login Error : ",e)
        ErrorHandle(request,response,e);
    }
}

export async function userUpdateAction(request: Request, response: Response){
    try{
        console.log(request.body);
        let user = await User.findOne(request.params.email);

        if(!user){
            throw new ErrorModel(404, errorCode.notFound, category.input,"user is not founded");
        }
        user.name = request.body.name;
        user.password = request.body.password;
        user.age = request.body.age;
        user.email = request.body.email;
        user.role = request.body.role;
        user.modDate = request.body.modDate;
        user.regDate = request.body.regDate;
        const result = await User.save(user);
        response.status(200).json(user);
    }catch(e){
        console.error("userUpdateAction is error : ",e)
        ErrorHandle(request,response,e);
    }
}

export async function userDeleteByAction(request: Request, response: Response){
    try{
        const user = await User.findOne(request.params.email);
        if(!user){
            throw new ErrorModel(404, errorCode.notFound, category.input,"user is not founded");
        }
        console.log("Delete by email = ", user.email);
        await User.remove(user);
        response.status(24);
    }catch(e){
        console.error("userDeleteByAction is error : ",e)
        ErrorHandle(request,response,e);
    }
}

export async function getUserByToken(request: CustomRequest, response: Response, next: NextFunction){
    try{
        const uuid : string = request.uuid;
        const user : User = await User.findOne({
            where :{
                uuid : uuid
            }
        })
        console.log("user : ",user);
        if(!user){
            throw new ErrorModel(404, errorCode.notFound, category.input, "user is not founded");
        }
        delete user.password;
        return response.status(200).json(user);
    }catch(e){
        console.error("getUserByToken is error : ",e)
        ErrorHandle(request, response, e);
    }
}


export async function renewalToken(request: CustomRequest, response: Response) {
    try {
        const uuid: string = request.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        const accessToken = makeUserJWT(user);
        const refreshToken = makeUserRefreshJWT(user);
        response.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (e) {
        console.error("getUserByToken error : ", e)
        ErrorHandle(request, response, e);
    }
}


export async function changeMyInfo(request: CustomRequest, response: Response) {
    try {
        const uuid: string = request.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        user.name = request.body.name === undefined ? user.name : request.body.name;
        user.password = request.body.password === undefined ? user.password : await bcrypt.hash(request.body.password, bcryptConfig.salt);
        user.age = request.body.age === undefined ? user.age : request.body.age;
        user.email = request.body.email === undefined ? user.email : request.body.email;
        user.modDate = new Date();
        const result = await User.save(user);
        response.status(200).json(result);
    } catch (e) {
        console.error("changeMyInfo error : ", e)
        ErrorHandle(request, response, e);
    }
}

