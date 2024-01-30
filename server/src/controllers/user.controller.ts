import express, { Request, Response } from "express"
import mysql from "mysql2/promise"
import {getAllMysql,addUserSql,deleteUserMysql, updateUserSql } from "../services/user.service"

const userRoutes = express.Router()
//lay tat ca user
export const getAll = async(req:Request,res:Response)=>{
    try {
       const [result] = await getAllMysql()
       console.log("result",result);
       
        res.status(200).json({
            message:"thanh cong",
            data:result,
        })
        
    } catch (error) {
        console.log("error",error);
    }
}
// lay ra 1 user theo id
export const getOne=async(req:Request,res:Response)=>{
    try {
        //   const result = await getOneMysql(Number(req.params.id))       
        // res.status(200).json({
        //     message:"thanh cong",
        //     data:result,
        // })
        
    } catch (error) {
        console.log("error",error);
    }
}
    //xoa user theo id
export const deleteUser=async(req:Request,res:Response)=>{
    try {
        const result = await deleteUserMysql(Number(req.params.id))
        console.log("result",result);
        const products = await getAllMysql();
        res.status(200).json({
            message:"xoa thanh cong",
            data:products,
        })
        
    } catch (error) {
        console.log("error",error);
    }
}

export const updateUser = async (req: Request, res: Response)=>{
    try {
        console.log("req.body",req.body);
        console.log("req.param",req.params);
    const {useName} = req.body
    const {id} = req.params
    const result = await updateUserSql(useName,Number(id))
    res.status(200).json({
        result,
        message:"sua thanh cong"
    })
    } catch (error) {
        console.log("error",error);
        
    }
    
}
export async function addUser(req:Request, res:Response) {
    console.log("req.body",req.body);
    const { useName } = req.body;
    const userPlayer = await addUserSql(useName);
    const user = await getAllMysql();

    res.status(200).json({
        user,
        message: "ok",
    });
}
