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
const ErrorModel_1 = require("../model/ErrorModel");
const ErrorCode_1 = require("../config/ErrorCode");
const Message_1 = require("../entity/Message");
exports.createMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        joi_1.checkValidation(req.body, joi_1.messageSchema);
        const boardId = Number(req.body.boardId);
        const uuid = req.uuid;
        const user = yield User_1.User.findOne({
            where: {
                uuid: uuid
            }
        });
        const board = yield Board_1.Board.findOne({
            where: {
                id: boardId
            }
        });
        console.log("user : ", user);
        if (!user || !board) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "not found");
        }
        let msg = new Message_1.Message();
        msg.user = user;
        msg.board = board;
        msg.title = req.body.title;
        msg.contents = req.body.contents;
        msg.regDate = new Date();
        msg.modDate = new Date();
        const result = yield Message_1.Message.save(msg);
        delete result["__user__"];
        console.log("result : ", result);
        res.status(201).json(result);
    }
    catch (e) {
        console.error("createMessage error : ", e);
        ErrorHandle_1.ErrorHandle(req, res, e);
    }
});
exports.updateMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        joi_1.checkValidation(req.body, joi_1.messageSchemaUpdate);
        const boardId = Number(req.body.boardId);
        const messageId = Number(req.params.messageId);
        if (isNaN(boardId) || isNaN(messageId)) {
            throw new ErrorModel_1.ErrorModel(400, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "board id or message id is not valid");
        }
        const uuid = req.uuid;
        const user = yield User_1.User.findOne({
            where: {
                uuid: uuid
            }
        });
        const board = yield Board_1.Board.findOne({
            where: {
                id: boardId
            }
        });
        console.log("user : ", user);
        if (!user || !board) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "not found");
        }
        let msg = yield Message_1.Message.findOne({
            where: {
                id: messageId,
                boardId: board.id,
                userId: user.id
            }
        });
        if (!msg) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "message not found");
        }
        msg.title = req.body.title === undefined ? msg.title : req.body.title;
        msg.contents = req.body.contents === undefined ? msg.contents : req.body.contents;
        msg.modDate = new Date();
        const result = yield Message_1.Message.save(msg);
        console.log("result : ", result);
        res.status(200).json(result);
    }
    catch (e) {
        console.error("updateMessage error : ", e);
        ErrorHandle_1.ErrorHandle(req, res, e);
    }
});
exports.deleteMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const messageId = Number(req.params.messageId);
        if (isNaN(messageId)) {
            throw new ErrorModel_1.ErrorModel(400, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "board id or message id is not valid");
        }
        const uuid = req.uuid;
        const user = yield User_1.User.findOne({
            where: {
                uuid: uuid
            }
        });
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "not found");
        }
        const msg = yield Message_1.Message.findOne({
            where: {
                id: messageId,
                userId: user.id
            }
        });
        if (!msg) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "message not found");
        }
        yield msg.remove();
        res.status(200).json({ msg: "success" });
    }
    catch (e) {
        console.error("removeMessage error : ", e);
        ErrorHandle_1.ErrorHandle(req, res, e);
    }
});
exports.getUserMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const uuid = req.uuid;
        const user = yield User_1.User.findOne({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            throw new ErrorModel_1.ErrorModel(404, ErrorCode_1.errorCode.notFound, ErrorCode_1.category.input, "not found");
        }
        const messages = yield user.messages;
        res.status(200).json(messages);
    }
    catch (e) {
        console.error("getUserMessages error : ", e);
        ErrorHandle_1.ErrorHandle(req, res, e);
    }
});
exports.getMessagesByBoard = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const boardId = Number(req.params.boardId);
        if (isNaN(boardId)) {
            throw new ErrorModel_1.ErrorModel(400, ErrorCode_1.errorCode.fieldValid, ErrorCode_1.category.input, "board id or message id is not valid");
        }
        const board = yield Board_1.Board.findOne({
            where: {
                id: boardId
            }
        });
        if (!board) {
            return res.status(200).json([]);
        }
        return res.status(200).json(yield board.messages);
    }
    catch (e) {
        console.error("getMessagesByBoard error : ", e);
        ErrorHandle_1.ErrorHandle(req, res, e);
    }
});
//# sourceMappingURL=MessageController.js.map