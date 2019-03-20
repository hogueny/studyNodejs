"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const jwt_1 = require("../util/jwt");
const bcrypt = require("bcrypt");
const Bcrypt_1 = require("../config/Bcrypt");
const joi_1 = require("../util/joi");
const ErrorHandle_1 = require("../util/ErrorHandle");
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
function userCreateAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("requst body", request.body);
            console.log("Insert Data Into UserTable");
            joi_1.checkValidation(request.body, joi_1.userSchema);
            let user = new User_1.User();
            user.name = request.body.name === undefined ? "" : request.body.name;
            user.password = yield bcrypt.hash(request.body.password, Bcrypt_1.bcryptConfig.salt);
            user.age = request.body.age;
            user.email = request.body.email;
            user.role = "normal";
            user.modDate = new Date();
            user.regDate = new Date();
            const result = yield User_1.User.save(user);
            console.log("User Data Saved");
            delete user.password;
            response.status(201).json(result);
        }
        catch (e) {
            console.error("create user error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userCreateAction = userCreateAction;
function userGetAllAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            console.log("All Users");
            response.status(200).json(users);
        }
        catch (e) {
            console.error("userGetAllAction error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userGetAllAction = userGetAllAction;
function userGetByIdAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne(request.params.id);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            console.log("Search id = ", user.id);
            response.status(200).json(user);
        }
        catch (e) {
            console.error("userGetByIdAction error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userGetByIdAction = userGetByIdAction;
function userUpdateAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(request.body);
            let user = yield User_1.User.findOne(request.params.id);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            user.name = request.body.name;
            user.password = request.body.password;
            user.age = request.body.age;
            user.email = request.body.email;
            user.role = request.body.role;
            user.regDate = request.body.regDate;
            user.modDate = request.body.modDate;
            const result = yield User_1.User.save(user);
            response.status(200).json(result);
        }
        catch (e) {
            console.error("userUpdateAction error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userUpdateAction = userUpdateAction;
function userDeleteByIdAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne(request.params.id);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            console.log("Delete id = ", user.id);
            yield User_1.User.remove(user);
            response.status(204);
        }
        catch (e) {
            console.error("userDeleteByIdAction error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userDeleteByIdAction = userDeleteByIdAction;
function userLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = request.body.email;
            const password = request.body.password;
            const user = yield User_1.User.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            const result = yield bcrypt.compare(password, user.password);
            if (!result) {
                throw new ErrorModel_1.ErrorModel(401, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "password not valid");
            }
            const accessToken = jwt_1.makeUserJWT(user);
            const refreshToken = jwt_1.makeUserRefreshJWT(user);
            response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (e) {
            console.error("login error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userLogin = userLogin;
function getUserByToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = req.uuid;
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            console.log("user : ", user);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            delete user.password;
            return res.status(200).json(user);
        }
        catch (e) {
            console.error("getUserByToken error : ", e);
            ErrorHandle_1.ErrorHandle(req, res, e);
        }
    });
}
exports.getUserByToken = getUserByToken;
function renewalToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = req.uuid;
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            const accessToken = jwt_1.makeUserJWT(user);
            const refreshToken = jwt_1.makeUserRefreshJWT(user);
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (e) {
            console.error("getUserByToken error : ", e);
            ErrorHandle_1.ErrorHandle(req, res, e);
        }
    });
}
exports.renewalToken = renewalToken;
function changeMyInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = req.uuid;
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            user.name = req.body.name === undefined ? user.name : req.body.name;
            user.password = req.body.password === undefined ? user.password : yield bcrypt.hash(req.body.password, Bcrypt_1.bcryptConfig.salt);
            user.age = req.body.age === undefined ? user.age : req.body.age;
            user.email = req.body.email === undefined ? user.email : req.body.email;
            user.modDate = new Date();
            const result = yield User_1.User.save(user);
            res.status(200).json(result);
        }
        catch (e) {
            console.error("changeMyInfo error : ", e);
            ErrorHandle_1.ErrorHandle(req, res, e);
        }
    });
}
exports.changeMyInfo = changeMyInfo;
//# sourceMappingURL=UserController.js.map