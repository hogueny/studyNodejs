"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../util/enum");
const Home_1 = require("../controllers/Home");
const userController_1 = require("../controllers/userController");
const token_1 = require("../middleware/token");
exports.AppRoutes = [
    {
        path: "/",
        method: enum_1.Method.GET,
        action: Home_1.home
    },
    {
        path: "/users",
        method: enum_1.Method.POST,
        action: userController_1.userCreateAction
    },
    {
        path: "/users",
        method: enum_1.Method.GET,
        action: userController_1.userGetAllAction
    },
    {
        path: "/users/me",
        method: enum_1.Method.GET,
        action: userController_1.getUserByToken,
        middleware: token_1.checkToken
    },
    {
        path: "/users/:id",
        method: enum_1.Method.GET,
        action: userController_1.userGetByEmailAction
    },
    {
        path: "/users/:id",
        method: enum_1.Method.PUT,
        action: userController_1.userUpdateAction
    },
    {
        path: "/users/:id",
        method: enum_1.Method.DELETE,
        action: userController_1.userDeleteByEmail
    },
    {
        path: "/users/login",
        method: enum_1.Method.POST,
        action: userController_1.userLogin
    }
];
//# sourceMappingURL=router.js.map