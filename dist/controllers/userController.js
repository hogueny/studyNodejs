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
function userCreateAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("requset body", request.body);
            console.log("Insert data");
            let user = new User_1.User();
            user.name = request.body.name;
            user.password = request.body.password;
            user.age = request.body.age;
            user.email = request.body.email;
            user.role = "nomal";
            user.regDate = new Date();
            user.modDate = new Date();
            const result = yield User_1.User.save(user);
            console.log("User Data Saved");
            response.status(201).json(result);
        }
        catch (e) {
            console.log("Create error!!");
        }
    });
}
exports.userCreateAction = userCreateAction;
//# sourceMappingURL=userController.js.map