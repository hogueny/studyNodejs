/**
 * 선언 우선순위에 의해 배치를 해야한다
 * /api/user/:idx
 * /api/user/restaurant 순으로 선언을 하면
 * /api/user/:idx 으로 먼저 요청이 가게 되므로 원하는 결과를 얻지 못한다.
 *
 * 따라서
 * /api/user/restaurant
 * /api/user/:idx
 * 순으로 선언을 해야 한다.
 */
import { RouterInterface } from "./util/interface";
import { Method } from "./util/enum";
import { home } from "./controller/Home";
import {
    userCreateAction,
    userDeleteByIdAction,
    userGetAllAction,
    userGetByIdAction,
    userUpdateAction,
    userLogin,
    getUserByToken,
    renewalToken,
    changeMyInfo
} from "./controller/UserController";
import { boardCreate, boardUpdate, boardsRead, boardDelete } from "./controller/BoardController";
import { checkToken, refreshToken } from "./middleware/token";
import { createMessage, updateMessage, deleteMessage, getUserMessages, getMessagesByBoard, getMessageDetail } from "./controller/MessageController";

export const AppRoutes: RouterInterface[] = [
    {
        path: "/",
        method: Method.GET,
        action: home
    },
    {
        path: "/users",
        method: Method.POST,
        action: userCreateAction
    },
    {
        path: "/users",
        method: Method.GET,
        action: userGetAllAction
    },
    {
        path: "/users/me",
        method: Method.GET,
        action: getUserByToken,
        middleware: checkToken
    },
    {
        path: "/users/me",
        method: Method.PATCH,
        action: changeMyInfo,
        middleware: checkToken
    },
    {
        path: "/users/refresh",
        method: Method.GET,
        action: renewalToken,
        middleware: refreshToken
    },
    {
        path: "/users/:id",
        method: Method.GET,
        action: userGetByIdAction
    },
    {
        path: "/users/:id",
        method: Method.PUT,
        action: userUpdateAction
    },
    {
        path: "/users/:id",
        method: Method.DELETE,
        action: userDeleteByIdAction
    },
    {
        path: "/users/login",
        method: Method.POST,
        action: userLogin
    },
    {
        path: "/boards",
        method: Method.POST,
        action: boardCreate,
        middleware: checkToken
    },
    {
        path: "/boards/:boardId",
        method: Method.PUT,
        action: boardUpdate,
        middleware: checkToken
    },
    {
        path: "/boards/:boardId",
        method: Method.DELETE,
        action: boardDelete,
        middleware: checkToken
    },
    {
        path: "/boards",
        method: Method.GET,
        action: boardsRead
    },
    {
        path: "/boards/:boardId/messages",
        method: Method.GET,
        action: getMessagesByBoard
    },
    {
        path: "/message",
        method: Method.POST,
        action: createMessage,
        middleware: checkToken
    },
    {
        path: "/message/:messageId",
        method: Method.PUT,
        action: updateMessage,
        middleware: checkToken
    },
    {
        path: "/message/:messageId",
        method: Method.DELETE,
        action: deleteMessage,
        middleware: checkToken
    },
    {
        path: "/message",
        method: Method.GET,
        action: getUserMessages,
        middleware: checkToken
    },
    {
        path: "/board/message/:messageId",
        method: Method.GET,
        action: getMessageDetail
    }
];

