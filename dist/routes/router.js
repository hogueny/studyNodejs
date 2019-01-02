"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../util/enum");
const Home_1 = require("../controllers/Home");
exports.AppRoutes = [
    {
        path: "/",
        method: enum_1.Method.GET,
        action: Home_1.home
    }
];
//
//# sourceMappingURL=router.js.map