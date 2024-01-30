import express, { Request, Response } from "express"
import userRoutes from "./routers/user.routes"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
dotenv.config()
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT:number = 8778

app.use("/api/v1/user",userRoutes)

app.listen(PORT,()=>{
    console.log("chay vao day");
    
})