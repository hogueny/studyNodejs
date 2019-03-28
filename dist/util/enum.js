"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Method;
(function (Method) {
    Method["POST"] = "post";
    Method["GET"] = "get";
    Method["PUT"] = "put";
    Method["DELETE"] = "delete";
    Method["PATCH"] = "patch";
})(Method = exports.Method || (exports.Method = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["NORMAL"] = "normal";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserRoleLevel;
(function (UserRoleLevel) {
    UserRoleLevel[UserRoleLevel["ADMIN"] = 99999] = "ADMIN";
    UserRoleLevel[UserRoleLevel["admin"] = 99999] = "admin";
    UserRoleLevel[UserRoleLevel["NORMAL"] = 1] = "NORMAL";
    UserRoleLevel[UserRoleLevel["normal"] = 1] = "normal";
    UserRoleLevel[UserRoleLevel["ANY"] = 0] = "ANY";
    UserRoleLevel[UserRoleLevel["any"] = 0] = "any";
})(UserRoleLevel = exports.UserRoleLevel || (exports.UserRoleLevel = {}));
//# sourceMappingURL=enum.js.map