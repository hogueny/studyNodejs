import { RouterInterface } from "../util/interface"
import { Method } from "../util/enum";

export const AppRoutes: RouterInterface[] = [
    {
        path : '/',
        method : Method.GET,
        action : home
    }
]