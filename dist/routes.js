"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./util/enum");
const Home_1 = require("./controller/Home");
const UserController_1 = require("./controller/UserController");
const BoardController_1 = require("./controller/BoardController");
const token_1 = require("./middleware/token");
const MessageController_1 = require("./controller/MessageController");
exports.AppRoutes = [
    {
        path: "/",
        method: enum_1.Method.GET,
        action: Home_1.home
    },
    {
        path: "/users",
        method: enum_1.Method.POST,
        action: UserController_1.userCreateAction
    },
    {
        path: "/users",
        method: enum_1.Method.GET,
        action: UserController_1.userGetAllAction
    },
    {
        path: "/users/me",
        method: enum_1.Method.GET,
        action: UserController_1.getUserByToken,
        middleware: token_1.checkToken
    },
    {
        path: "/users/me",
        method: enum_1.Method.PATCH,
        action: UserController_1.changeMyInfo,
        middleware: token_1.checkToken
    },
    {
        path: "/users/refresh",
        method: enum_1.Method.GET,
        action: UserController_1.renewalToken,
        middleware: token_1.refreshToken
    },
    {
        path: "/users/:id",
        method: enum_1.Method.GET,
        action: UserController_1.userGetByIdAction
    },
    {
        path: "/users/:id",
        method: enum_1.Method.PUT,
        action: UserController_1.userUpdateAction
    },
    {
        path: "/users/:id",
        method: enum_1.Method.DELETE,
        action: UserController_1.userDeleteByIdAction
    },
    {
        path: "/users/login",
        method: enum_1.Method.POST,
        action: UserController_1.userLogin
    },
    {
        path: "/boards",
        method: enum_1.Method.POST,
        action: BoardController_1.boardCreate,
        middleware: token_1.checkToken
    },
    {
        path: "/boards/:boardId",
        method: enum_1.Method.PUT,
        action: BoardController_1.boardUpdate,
        middleware: token_1.checkToken
    },
    {
        path: "/boards/:boardId",
        method: enum_1.Method.DELETE,
        action: BoardController_1.boardDelete,
        middleware: token_1.checkToken
    },
    {
        path: "/boards",
        method: enum_1.Method.GET,
        action: BoardController_1.boardsRead
    },
    {
        path: "/boards/:boardId/messages",
        method: enum_1.Method.GET,
        action: MessageController_1.getMessagesByBoard
    },
    {
        path: "/message",
        method: enum_1.Method.POST,
        action: MessageController_1.createMessage,
        middleware: token_1.checkToken
    },
    {
        path: "/message/:messageId",
        method: enum_1.Method.PUT,
        action: MessageController_1.updateMessage,
        middleware: token_1.checkToken
    },
    {
        path: "/message/:messageId",
        method: enum_1.Method.DELETE,
        action: MessageController_1.deleteMessage,
        middleware: token_1.checkToken
    },
    {
        path: "/message",
        method: enum_1.Method.GET,
        action: MessageController_1.getUserMessages,
        middleware: token_1.checkToken
    },
    {
        path: "/board/message/:messageId",
        method: enum_1.Method.GET,
        action: MessageController_1.getMessageDetail
    }
];
//# sourceMappingURL=routes.js.map