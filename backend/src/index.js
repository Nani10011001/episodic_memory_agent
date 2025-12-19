import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Dbconnection from "../db/db.connection.js"
import chatRoter from "./router/chat.router.js"
dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())

app.use("/api",chatRoter)
const start_server=async()=>{
    try {
        await Dbconnection()
        app.listen(process.env.PORT,console.log(`server starting at ${process.env.PORT}`))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start_server()