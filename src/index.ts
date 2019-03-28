import * as express from 'express';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as errorHandler from "errorhandler";
import * as http from 'http';
import { AppRoutes } from "./routes";
import * as cors from 'cors';
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { checkToken } from './middleware/token';

const app: any = express();
const server: http.Server = http.createServer(app);
let dbConnection: Connection;


export async function startServer(): Promise<express.Application> {
    try {
        setMiddleWares();
        registerAPI();
        const connectionOptions = await getConnectionOptions(process.env.WHO);
        dbConnection = await createConnection({ ...connectionOptions, name: "default" });
        server.listen(process.env.PORT || 3000);
        return app;
    } catch (error) {
        throw error;
    }
}

export function stopServer() {
    server.close(async () => {
        console.log("server", { msg: "Express Server Closed", value: null });
        await dbConnection.close();
        console.log("sql", { msg: "Database disconnected", value: null });
    });
}

function setMiddleWares() {
    app.use(cors({ origin: true }));
    app.use(errorHandler());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });
}

// register all application routes
function registerAPI() {
    AppRoutes.forEach(route => {
        if (route.middleware) {
            app[route.method](route.path, route.middleware, (request: Request, response: Response, next: Function) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            });
        } else {
            app[route.method](route.path, (request: Request, response: Response, next: Function) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            });
        }
    });
}

if (require.main === module) {
    startServer().then(() => { console.info("server start"); }).catch((error) => console.log(error));
}
