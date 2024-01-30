import express, { Request, Response } from "express"
import {getAll,addUser,deleteUser, updateUser} from "../controllers/user.controller"

const userRoutes = express.Router()
// lay tat ca user
userRoutes.get("/",getAll)
//them moi
userRoutes.post("/", addUser)
// xoa user theo id
userRoutes.delete("/:id",deleteUser)
//sua?
userRoutes.put("/:id",updateUser)
export default userRoutes