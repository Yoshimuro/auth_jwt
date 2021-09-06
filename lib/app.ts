import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import {db} from "./config/database";


const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors)
// @ts-ignore
// app.use('/api',Index)

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log(`Server listening on port = ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start();
