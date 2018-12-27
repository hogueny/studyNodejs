import { Method } from "./enum";
import { Request } from "express"

interface RouterInterface {
    path : string,
    method : Method,
    action : Function
}