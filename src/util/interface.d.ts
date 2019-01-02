import { Method } from "./enum";
import { Request } from "express"

interface RouterInterface {
    path : string,
    method : Method,
    action : Function
}

interface CustomRequest extends Request {
    uuid: string
}