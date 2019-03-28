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
const joi_1 = require("../util/joi");
const Board_1 = require("../entity/Board");
const ErrorHandle_1 = require("../util/ErrorHandle");
const enum_1 = require("../util/enum");
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
const Message_1 = require("../entity/Message");
function boardCreate(request, response) {
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
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            joi_1.checkValidation(request.body, joi_1.boardSchema);
            if (enum_1.UserRoleLevel[user.role] < enum_1.UserRoleLevel.ADMIN) {
                throw new ErrorModel_1.ErrorModel(401, ErrorCode_1.errorCode.permission, ErrorCode_1.category.contentPolicy, "권한 없다 가라");
            }
            let board = new Board_1.Board();
            board.modDate = new Date();
            board.regDate = new Date();
            board.name = request.body.name;
            const result = yield Board_1.Board.save(board);
            response.status(201).json(result);
        }
        catch (e) {
            console.error("boardCreate error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.boardCreate = boardCreate;
function boardUpdate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = request.uuid;
            const boardId = Number(request.params.boardId);
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            console.log("user : ", user);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            joi_1.checkValidation(request.body, joi_1.boardSchemaUpdate);
            console.log(`user role level : ${enum_1.UserRoleLevel[user.role.toUpperCase()]}`);
            console.log(`admin role level : ${enum_1.UserRoleLevel.ADMIN}`);
            console.log(`compre : ${enum_1.UserRoleLevel.ADMIN}`);
            if (enum_1.UserRoleLevel[user.role.toUpperCase()] < enum_1.UserRoleLevel.ADMIN) {
                throw new ErrorModel_1.ErrorModel(401, ErrorCode_1.errorCode.permission, ErrorCode_1.category.contentPolicy, "권한 없다 가라");
            }
            let board = yield Board_1.Board.findOne(boardId);
            if (!board) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "board not found");
            }
            board.modDate = new Date();
            board.name = request.body.name;
            const result = yield Board_1.Board.save(board);
            response.status(200).json(result);
        }
        catch (e) {
            console.error("boardUpdate error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.boardUpdate = boardUpdate;
function boardDelete(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = request.uuid;
            const boardId = Number(request.params.boardId);
            const user = yield User_1.User.findOne({
                where: {
                    uuid: uuid
                }
            });
            console.log("user : ", user);
            if (!user) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "user not found");
            }
            if (user.role !== enum_1.UserRole.ADMIN) {
                throw new ErrorModel_1.ErrorModel(401, ErrorCode_1.errorCode.permission, ErrorCode_1.category.contentPolicy, "권한 없다 가라");
            }
            let board = yield Board_1.Board.findOne(boardId);
            if (!board) {
                throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "board not found");
            }
            const messages = yield board.messages;
            if (messages.length > 0) {
                yield Message_1.Message.remove(messages);
            }
            const result = yield Board_1.Board.remove(board);
            response.status(200).json(result);
        }
        catch (e) {
            console.error("boardDelete error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.boardDelete = boardDelete;
function boardsRead(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let board = yield Board_1.Board.find();
            response.status(200).json(board);
        }
        catch (e) {
            console.error("boardDelete error : ", e);
            ErrorHandle_1.ErrorHandle(request, response, e);
        }
    });
}
exports.boardsRead = boardsRead;
//# sourceMappingURL=BoardController.js.map