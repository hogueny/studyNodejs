"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorModel {
    constructor(status, code, category, msg) {
        this.status = status;
        this.code = code;
        this.category = category;
        this.msg = msg;
    }
    /**
     * Getter $msg
     * @return {string}
     */
    get $msg() {
        return this.msg;
    }
    /**
     * Getter $code
     * @return {string}
     */
    get $code() {
        return this.code;
    }
    /**
     * Getter $category
     * @return {string}
     */
    get $category() {
        return this.category;
    }
    /**
     * Getter $status
     * @return {number}
     */
    get $status() {
        return this.status;
    }
    /**
     * Setter $msg
     * @param {string} value
     */
    set $msg(value) {
        this.msg = value;
    }
    /**
     * Setter $code
     * @param {string} value
     */
    set $code(value) {
        this.code = value;
    }
    /**
     * Setter $category
     * @param {string} value
     */
    set $category(value) {
        this.category = value;
    }
    /**
     * Setter $status
     * @param {number} value
     */
    set $status(value) {
        this.status = value;
    }
}
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=ErrorModel.js.map