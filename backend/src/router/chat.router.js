import express from "express"
import { agent_controller } from "../controller/chat_short_mem_controller.js"
const chatRoter=express.Router()
chatRoter.post("/stm",agent_controller)
export default chatRoter