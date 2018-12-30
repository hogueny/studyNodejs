import { RouterInterface } from "../util/interface"
import { Method } from "../util/enum";
import { home } from "../controllers/Home"

export const AppRoutes: RouterInterface[] = [
    {
        path : "/",
        method : Method.GET,
        action : home
    }
]

//