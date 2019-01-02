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
const bcrypt_1 = require("bcrypt");
const bcrypt = require("bcrypt"); // compare, hash....
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
const jwt_1 = require("../util/jwt");
const ErrorHandle_1 = require("../util/ErrorHandle");
const joi_1 = require("../util/joi");
const Bcrypt_1 = require("../config/Bcrypt");
function userCreateAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("requset body", request.body);
            console.log("Insert data");
            joi_1.checkValidation(request.body, joi_1.userSchema);
            let user = new User_1.User();
            user.name = request.body.name === undefined ? "" : request.body.name;
            user.password = yield bcrypt.hash(request.body.password, Bcrypt_1.bcryptConfig.salt);
            //user.name = request.body.name;
            //user.password = request.body.password;
            user.age = request.body.age;
            user.email = request.body.email;
            user.role = "nomal";
            user.regDate = new Date();
            user.modDate = new Date();
            const result = yield User_1.User.save(user);
            console.log("User Data Saved");
            delete user.password;
            response.status(201).json(result);
        }
        catch (e) {
            console.error("Create error is : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userCreateAction = userCreateAction;
function userGetAllAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            console.log("All users");
            response.status(200).json(users);
        }
        catch (e) {
            console.error("userGetAllAction is error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userGetAllAction = userGetAllAction;
function userGetByEmailAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne(request.body.email);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            console.log("Search by Email = ", user.email);
            response.status(200).json(user);
        }
        catch (e) {
            console.log("userGetByEmailAction is Error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userGetByEmailAction = userGetByEmailAction;
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
                throw console.log('User is not found');
            }
            const result = yield bcrypt_1.compare(password, user.password);
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
            console.error("login Error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userLogin = userLogin;
function userUpdateAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(request.body);
            let user = yield User_1.User.findOne(request.params.email);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user is not founded");
            }
            user.name = request.body.name;
            user.password = request.body.password;
            user.age = request.body.age;
            user.email = request.body.email;
            user.role = request.body.role;
            user.modDate = request.body.modDate;
            user.regDate = request.body.regDate;
            const result = yield User_1.User.save(user);
            response.status(200).json(user);
        }
        catch (e) {
            console.error("userUpdateAction is error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userUpdateAction = userUpdateAction;
function userDeleteByAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne(request.params.email);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user is not founded");
            }
            console.log("Delete by email = ", user.email);
            yield User_1.User.remove(user);
            response.status(24);
        }
        catch (e) {
            console.error("userDeleteByAction is error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.userDeleteByAction = userDeleteByAction;
function getUserByToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = request.uuid;
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            console.log("user : ", user);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user is not founded");
            }
            delete user.password;
            return response.status(200).json(user);
        }
        catch (e) {
            console.error("getUserByToken is error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.getUserByToken = getUserByToken;
function renewalToken(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = request.uuid;
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
            response.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (e) {
            console.error("getUserByToken error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.renewalToken = renewalToken;
function changeMyInfo(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = request.uuid;
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            user.name = request.body.name === undefined ? user.name : request.body.name;
            user.password = request.body.password === undefined ? user.password : yield bcrypt.hash(request.body.password, Bcrypt_1.bcryptConfig.salt);
            user.age = request.body.age === undefined ? user.age : request.body.age;
            user.email = request.body.email === undefined ? user.email : request.body.email;
            user.modDate = new Date();
            const result = yield User_1.User.save(user);
            response.status(200).json(result);
        }
        catch (e) {
            console.error("changeMyInfo error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.changeMyInfo = changeMyInfo;
//# sourceMappingURL=userController.js.map