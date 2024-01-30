import express, { Request, Response } from "express"
import mysql from "mysql2/promise"
import pool from "../config/db.config"

const userRoutes = express.Router()

export const getAllMysql = async()=>{
        const user = mysql.createPool(pool)
       const [todo] = await user.execute("select * from users")
       return todo
}
export async function addUserSql(userName:any) {
    console.log(userName);
        const user = mysql.createPool(pool)
    const [player] = await user.execute("insert into users (useName) values (?)",
        [userName]
    );
    return player;
}

export const deleteUserMysql=async(id:number)=>{
    try {
        const user = mysql.createPool(pool)
        const [result] =await user.execute("DELETE FROM users where id=?",[id])
        return result
    } catch (error) {
        console.log("error",error);
    }
}
//sua?
export const updateUserSql = async (nameProduct:string,id:number)=>{
    try {
        const user = mysql.createPool(pool)
        const [result] = await user.execute("UPDATE users SET useName = ? WHERE id = ? ",[nameProduct,id])

        console.log("result,result",result);
        
        return result
    } catch (error) {
        console.log(error)
    }
}

