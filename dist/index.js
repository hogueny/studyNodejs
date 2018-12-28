"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const cors = require("cors");
const router_1 = require("./routes/router");
const typeorm_1 = require("typeorm");
const app = express();
const server = http.createServer(app);
let dbConnection;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            setMiddleWares();
            registerAPI();
            const connectionOptions = yield typeorm_1.getConnectionOptions(process.env.WHO);
            dbConnection = yield typeorm_1.createConnection(Object.assign({}, connectionOptions, { name: "default" }));
            server.listen(process.env.PORT || 3000);
            return app;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.startServer = startServer;
function stopServer() {
    server.close(() => __awaiter(this, void 0, void 0, function* () {
        console.log("server", { msg: "Express Server Closed", value: null });
        yield dbConnection.close();
        console.log("sql", { msg: "Database disconnected", value: null });
    }));
}
exports.stopServer = stopServer;
function setMiddleWares() {
    app.use(cors({ origin: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(function (err, req, res, next) {
        err.status = 404;
        next(err);
    });
}
// register all application routes
function registerAPI() {
    router_1.AppRoutes.forEach(route => {
        app[route.method](route.path, (request, response, next) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
}
if (require.main === module) {
    startServer().then(() => { console.info("server start"); }).catch((error) => console.log(error));
}
//# sourceMappingURL=index.js.map