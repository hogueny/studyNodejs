"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorModel {
    constructor(status, code, category, msg) {
        this.status = status;
        this.code = code;
        this.category = category;
        this.msg = msg;
    }
    get $msg() {
        return this.msg;
    }
    get $code() {
        return this.code;
    }
    get $category() {
        return this.category;
    }
    get $status() {
        return this.status;
    }
    set $msg(value) {
        this.msg;
    }
    set $code(value) {
        this.code;
    }
    set $category(value) {
        this.category;
    }
    set $status(value) {
        this.status;
    }
}
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=ErrorModel.js.map