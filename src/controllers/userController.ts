import { Request, Response } from "express";
import { User } from "../entity/User";

export async function userCreateAction(request:Request, response:Response){
    try{
        console.log("requset body",request.body);
        console.log("Insert data");
        
        let user = new User();
        user.name = request.body.name;
        user.password = request.body.password;
        user.age = request.body.age;
        user.email = request.body.email;
        user.role = "nomal";
        user.regDate = new Date();
        user.modDate = new Date();

        const result = await User.save(user);
        console.log("User Data Saved");
        response.status(201).json(result);

    }catch(e){
        console.log("Create error!!");
    }
}