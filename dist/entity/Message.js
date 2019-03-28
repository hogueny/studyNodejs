"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Board_1 = require("./Board");
const User_1 = require("./User");
let Message = class Message extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", default: "", nullable: false }),
    __metadata("design:type", String)
], Message.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Message.prototype, "contents", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], Message.prototype, "regDate", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], Message.prototype, "modDate", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Board_1.Board, board => board.messages),
    __metadata("design:type", Board_1.Board)
], Message.prototype, "board", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "boardId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.messages, { lazy: true }),
    __metadata("design:type", User_1.User)
], Message.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "userId", void 0);
Message = __decorate([
    typeorm_1.Entity()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map