import { Request, Response } from 'express';

export const home = async (request : Request, response : Response) => {
    console.log("this is home");
    let home: string = count();
    home +=1;
    response.status(200).json({msg:"success" , home : home});
}

const count = (): string =>{
    return "home";
}