import { Request, Response } from "express";
import { CustomRequest } from "../util/interface";
import { User } from "../entity/User";
import { makeUserJWT, makeUserRefreshJWT } from "../util/jwt";
import { NextFunction } from "connect";
import * as bcrypt from "bcrypt";
import { bcryptConfig } from "../config/Bcrypt";
import { checkValidation, userSchema } from "../util/joi";
import { ErrorHandle } from "../util/ErrorHandle";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";

export async function userCreateAction(request: Request, response: Response) {
    try {
        console.log("requst body", request.body);
        console.log("Insert Data Into UserTable");
        checkValidation(request.body, userSchema);

        let user = new User();
        user.name = request.body.name === undefined ? "" : request.body.name;
        user.password = await bcrypt.hash(request.body.password, bcryptConfig.salt);
        user.age = request.body.age;
        user.email = request.body.email;
        user.role = "normal";
        user.modDate = new Date();
        user.regDate = new Date();
        const result = await User.save(user);
        console.log("User Data Saved");

        delete user.password;
        response.status(201).json(result);
    } catch (e) {
        console.error("create user error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function userGetAllAction(request: CustomRequest, response: Response) {
    try {
        const users = await User.find();
        console.log("All Users");
        response.status(200).json(users);
    } catch (e) {
        console.error("userGetAllAction error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function userGetByIdAction(request: CustomRequest, response: Response) {
    try {
        const user = await User.findOne(request.params.id);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        console.log("Search id = ", user.id);
        response.status(200).json(user);
    } catch (e) {
        console.error("userGetByIdAction error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function userUpdateAction(request: CustomRequest, response: Response) {
    try {
        console.log(request.body);
        let user = await User.findOne(request.params.id);

        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        user.name = request.body.name;
        user.password = request.body.password;
        user.age = request.body.age;
        user.email = request.body.email;
        user.role = request.body.role;
        user.regDate = request.body.regDate;
        user.modDate = request.body.modDate;
        const result = await User.save(user);
        response.status(200).json(result)
    } catch (e) {
        console.error("userUpdateAction error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function userDeleteByIdAction(request: CustomRequest, response: Response) {
    try {
        const user = await User.findOne(request.params.id);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        console.log("Delete id = ", user.id);
        await User.remove(user);
        response.status(204);
    } catch (e) {
        console.error("userDeleteByIdAction error : ", e);
        ErrorHandle(request, response, e);
    }
}


export async function userLogin(request: CustomRequest, response: Response) {
    try {
        const email: string = request.body.email;
        const password: string = request.body.password;

        const user: User = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        const result: boolean = await bcrypt.compare(password, user.password);

        if (!result) {
            throw new ErrorModel(401, errorCode.fieldValid, category.input, "password not valid");
        }
        const accessToken = makeUserJWT(user);
        const refreshToken = makeUserRefreshJWT(user);
        response.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (e) {
        console.error("login error : ", e)
        ErrorHandle(request, response, e);
    }
}

export async function getUserByToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        delete user.password;
        return res.status(200).json(user);
    } catch (e) {
        console.error("getUserByToken error : ", e)
        ErrorHandle(req, res, e);
    }
}

export async function renewalToken(req: CustomRequest, res: Response) {
    try {
        const uuid: string = req.uuid;
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
        res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (e) {
        console.error("getUserByToken error : ", e)
        ErrorHandle(req, res, e);
    }
}

export async function changeMyInfo(req: CustomRequest, res: Response) {
    try {
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        user.name = req.body.name === undefined ? user.name : req.body.name;
        user.password = req.body.password === undefined ? user.password : await bcrypt.hash(req.body.password, bcryptConfig.salt);
        user.age = req.body.age === undefined ? user.age : req.body.age;
        user.email = req.body.email === undefined ? user.email : req.body.email;
        user.modDate = new Date();
        const result = await User.save(user);
        res.status(200).json(result);
    } catch (e) {
        console.error("changeMyInfo error : ", e)
        ErrorHandle(req, res, e);
    }
}

