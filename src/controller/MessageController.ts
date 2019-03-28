import { User } from "../entity/User";
import { CustomRequest } from "../util/interface";
import { checkValidation, messageSchema, boardSchemaUpdate, messageSchemaUpdate } from "../util/joi";
import { Response } from "express";
import { Board } from "../entity/Board";
import { ErrorHandle } from "../util/ErrorHandle";
import { UserRole, UserRoleLevel } from "../util/enum";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";
import { Message } from "../entity/Message";


export const createMessage = async (req: CustomRequest, res: Response) => {
    try {
        checkValidation(req.body, messageSchema);
        const boardId: number = Number(req.body.boardId);
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })

        const board: Board = await Board.findOne({
            where: {
                id: boardId
            }
        })
        console.log("user : ", user);
        if (!user || !board) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "not found");
        }
        if (user.role === board.role || user.role === "admin") {
            let msg = new Message();
            msg.user = user;
            msg.board = board;
            msg.title = req.body.title;
            msg.contents = req.body.contents;
            msg.regDate = new Date();
            msg.modDate = new Date();
            const result = await Message.save(msg);
            delete result["__user__"];
            console.log("result : ", result);
            res.status(201).json(result);
        } else {
            throw new ErrorModel(401, errorCode.permission, category.security, "권한 없음");
        }
    } catch (e) {
        console.error("createMessage error : ", e);
        ErrorHandle(req, res, e);
    }
}

export const updateMessage = async (req: CustomRequest, res: Response) => {
    try {
        checkValidation(req.body, messageSchemaUpdate);
        const boardId: number = Number(req.body.boardId);
        const messageId: number = Number(req.params.messageId);

        if (isNaN(boardId) || isNaN(messageId)) {
            throw new ErrorModel(400, errorCode.fieldValid, category.input, "board id or message id is not valid");
        }
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        })

        const board: Board = await Board.findOne({
            where: {
                id: boardId
            }
        })
        console.log("user : ", user);
        if (!user || !board) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "not found");
        }


        let msg = await Message.findOne({
            where: {
                id: messageId
            }
        });
        if (user.id !== msg.userId) {
            throw new ErrorModel(401, errorCode.permission, category.security, "니 게시물이 아님");
        }
        if (!msg) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "message not found");
        }
        msg.title = req.body.title === undefined ? msg.title : req.body.title;
        msg.contents = req.body.contents === undefined ? msg.contents : req.body.contents;
        msg.modDate = new Date();
        const result = await Message.save(msg);
        console.log("result : ", result);
        res.status(200).json(result);
    } catch (e) {
        console.error("updateMessage error : ", e);
        ErrorHandle(req, res, e);
    }
}


export const deleteMessage = async (req: CustomRequest, res: Response) => {
    try {
        const messageId: number = Number(req.params.messageId);
        if (isNaN(messageId)) {
            throw new ErrorModel(400, errorCode.fieldValid, category.input, "board id or message id is not valid");
        }
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            where: {
                uuid: uuid
            }
        });
        console.log("user : ", user);
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "not found");
        }
        const msg = await Message.findOne({
            where: {
                id: messageId
            }
        });
        if (!msg) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "message not found");
        }

        if (msg.userId !== user.id) {
            throw new ErrorModel(401, errorCode.permission, category.security, "니는 지울 권한이 없다");
        }

        await msg.remove();
        res.status(200).json({ msg: "success" });
    } catch (e) {
        console.error("removeMessage error : ", e);
        ErrorHandle(req, res, e);
    }
}

export const getUserMessages = async (req: CustomRequest, res: Response) => {
    try {
        const uuid: string = req.uuid;
        const user: User = await User.findOne({
            relations: ["messages", "messages.board"],
            where: {
                uuid: uuid
            }
        })
        if (!user) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "not found");
        }
        console.log("user : ", user);
        res.status(200).json(user["__messages__"]);
    } catch (e) {
        console.error("getUserMessages error : ", e);
        ErrorHandle(req, res, e);
    }
}

export const getMessagesByBoard = async (req: CustomRequest, res: Response) => {
    try {
        // page : 해당페이지 / rowCount : 한페이지당 메시지수 / startPage : 페이지 1 / totalCount : 게시판의 총 메시지 /  
        const boardId: number = Number(req.params.boardId);
        const page: number = Number(req.query.page) || 1;
        if (isNaN(boardId)) {
            throw new ErrorModel(400, errorCode.fieldValid, category.input, "board id or message id is not valid");
        }
        if (isNaN(page)) {
            throw new ErrorModel(400, errorCode.fieldValid, category.input, "page number is not valid");
        }
        const board: Board = await Board.findOne({
            where: {
                id: boardId
            }
        });
        if (!board) {
            return res.status(200).json([]);
        }
        const totalCount: any = await Message.count({
            where: { board }
        });
        const rowCount = 10;
        let totalPage = Math.ceil(totalCount / rowCount);
        if (totalCount > rowCount * totalPage) {
            totalPage++;
        }
        const startPage = ((page - 1) * rowCount);
        const messages: Message[] = await Message.find({
            where: { board },
            skip: startPage,
            take: rowCount
        });
        console.log("한페이지당 게시글 : ", rowCount);
        console.log("게시판의 총 메시지 : ", totalCount);
        console.log("총 페이지 : ", totalPage);
        console.log("첫페이지 : ", startPage);

        return res.status(200).json({
            payload: {
                list: messages,
                length: messages.length
            },
            totalCount,
            totalPage
        });
    } catch (e) {
        console.error("getMessagesByBoard error : ", e);
        ErrorHandle(req, res, e);
    }
}

export const getMessageDetail = async (req : CustomRequest, res : Response)=> {
    try{
        const messageId: number = Number(req.params.messageId);
        const message: Message[] = await Message.find({
            where: {
                id: messageId
            }
        });
        if (!message) {
            throw new ErrorModel(404, errorCode.notFound, category.input, "not found");
        }
        console.log("message : ", message);
        res.status(200).json(message);
        
    } catch(e) {
        console.error("getMessageDetail Error : ",e);
        ErrorHandle(req, res, e);
    }
}