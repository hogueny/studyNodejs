import { User } from "../entity/User";
import { CustomRequest } from "../util/interface";
import { checkValidation, boardSchema, boardSchemaUpdate } from "../util/joi";
import { Response } from "express";
import { Board } from "../entity/Board";
import { ErrorHandle } from "../util/ErrorHandle";
import { UserRole, UserRoleLevel } from "../util/enum";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";
import { Message } from "../entity/Message";

export async function boardCreate(request: CustomRequest, response: Response) {
    try {
        const uuid: string = request.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        checkValidation(request.body, boardSchema);

        if (UserRoleLevel[user.role] < UserRoleLevel.ADMIN) {
            throw new ErrorModel(401, errorCode.permission, category.contentPolicy, "권한 없다 가라");
        }

        let board = new Board();
        board.modDate = new Date();
        board.regDate = new Date();
        board.name= request.body.name;
        board.role= request.body.role;
        const result = await Board.save(board);
        response.status(201).json(result);
    } catch (e) {
        console.error("boardCreate error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function boardUpdate(request: CustomRequest, response: Response) {
    try {
        const uuid: string = request.uuid;
        const boardId: number = Number(request.params.boardId);
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }
        checkValidation(request.body, boardSchemaUpdate);
        console.log(`user role level : ${UserRoleLevel[user.role.toUpperCase()]}`);
        console.log(`admin role level : ${UserRoleLevel.ADMIN}`);
        console.log(`compre : ${UserRoleLevel.ADMIN}`);
        if (UserRoleLevel[user.role.toUpperCase()] < UserRoleLevel.ADMIN) {
            throw new ErrorModel(401, errorCode.permission, category.contentPolicy, "권한 없다 가라");
        }

        let board = await Board.findOne(boardId);
        if (!board) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "board not found");
        }
        board.modDate = new Date();
        board.name = request.body.name;
        board.role = request.body.role;
        const result = await Board.save(board);
        response.status(200).json(result);
    } catch (e) {
        console.error("boardUpdate error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function boardDelete(request: CustomRequest, response: Response) {
    try {
        const uuid: string = request.uuid;
        const boardId: number = Number(request.params.boardId);
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "user not found");
        }

        if (user.role !== UserRole.ADMIN) {
            throw new ErrorModel(401, errorCode.permission, category.contentPolicy, "권한 없다 가라");
        }

        let board = await Board.findOne(boardId);
        if (!board) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "board not found");
        }
        const messages: Message[] = await board.messages;
        if (messages.length > 0) {
            await Message.remove(messages);
        }
        const result = await Board.remove(board);
        response.status(200).json(result);
    } catch (e) {
        console.error("boardDelete error : ", e);
        ErrorHandle(request, response, e);
    }
}

export async function boardsRead(request: CustomRequest, response: Response) {
    try {
        let board: Board[] = await Board.find();
        response.status(200).json(board);
    } catch (e) {
        console.error("boardDelete error : ", e);
        ErrorHandle(request, response, e);
    }
}