import app from './app'
import {db} from "./config/database";
const PORT = process.env.PORT || 3000

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