import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import {Routes} from "./Routes";

class App{
    public app: express.Application
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express()
        this.config()
        this.routePrv.routes(this.app)
    }
    private config():void{
        this.app.use(errorMiddleware)
        this.app.use(loggerMiddleware)
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:false}))
    }
}

export default new App().app

