import {Request, Response} from "express";

export const home = async (req: Request, res: Response) => {
    console.info("this is home");
    let test: string = something();
    test += 1; // "test1"
    res.status(200).json({msg: "success", test: test});
};

const something = (): string => {
    return "test";
};
