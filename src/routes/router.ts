import { RouterInterface } from "../util/interface"
import { Method } from "../util/enum";
import { home } from "../controllers/Home"
import {
    userCreateAction,
    userGetAllAction,
    userGetByEmailAction,
    userUpdateAction,
    userDeleteByEmail,
    userLogin,
    getUserByToken
} from "../controllers/userController";
import { checkToken } from "../middleware/token";
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
        path: "/users/:id",
        method: Method.GET,
        action: userGetByEmailAction
    },
    {
        path: "/users/:id",
        method: Method.PUT,
        action: userUpdateAction
    },
    {
        path: "/users/:id",
        method: Method.DELETE,
        action: userDeleteByEmail
    },
    {
        path: "/users/login",
        method: Method.POST,
        action: userLogin
    }
]