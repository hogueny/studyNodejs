import { Request, Response } from "express";
import { ErrorModel } from "../model/ErrorModel";
import { errorCode, category } from "../config/ErrorCode";

export const ErrorHandle = (req: Request, res: Response, e: any) => {
    if (e instanceof ErrorModel) {
        return res.status(e["status"]).json({
            code: e["code"],
            category: e["category"],
            msg: e["msg"]
        })
    } else {
        return res.status(500).json({
            code: errorCode.unknown,
            category: category.unknown,
            msg: "server error"
        })
    }
}