import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import './TodoList.scss'
import publicAxios from '../../config/publicAxios';
export interface todoList {
    id: number
    useName: string
    status: boolean
}
export default function TodoList() {
    const [users, setUsers] = useState([]);
    const [newTodo, setNewTodo] = useState({
        useName: "",
    });
    console.log(users);
    
    const [idEdit, setIdEdit] = useState<number>(0)
    const handleGetValue = (e:any) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
    };    
    const handleGetUsers = async () => {
        try {
            const response = await publicAxios.get("/api/v1/user");            
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetUsers();
    }, []);    

    const handleAdd = async () => {
        try {
           
            const response = await publicAxios.post("/api/v1/user", {
                ...newTodo,
            });            
            setUsers(response.data.user);
            setNewTodo({
                useName: "",
            })
           
        } catch (error) {
            console.log("error", error);
            
        }
    };

    const handleDelete = async (id:number) => {
        try {
            const response = await publicAxios.delete(`/api/v1/user/${id}`); 
            setUsers(response.data.todo);
        } catch (error) { 
            console.log("error", error);
        }
    };
    const handleEdit = async (item:any) => {
        setNewTodo(item);
        setIdEdit(item.id)
    };

    const handleSave = async () => {
        if (idEdit){
            try {
                const response = await publicAxios.put(
                    `/api/v1/user/${idEdit}`,
                    { ...newTodo }
                );
                setUsers(response.data.todo);
                setNewTodo({
                    useName: "",
                })
            } catch (error) {
                console.log(error)
            }
        }else{
            handleAdd()
        }
       
    };
  return (
    <>
          <div className='container'>
              <div className='container_1'>DANH SÁCH CÔNG VIỆC</div>
              <div className='container_2'>
                  <input type="text"
                      name="useName"
                      onChange={handleGetValue}
                      value={newTodo.useName}
                  
                  />
                  <button className='btn_add' onClick={handleSave}>
                      {idEdit ? "Sửa" : "Thêm"}
                  </button>
              </div>
             
              <div>
                  {users.map((item: todoList, index: any) => {
                      return <div className='container_3' key={index}>
                          <div className='check_box'>
                              {/* <input type="checkbox" checked={item.status} onChange={(e) => handleChangeStatus(e, item.id)} /> */}
                              <input type="checkbox"/>

                          </div>
                          <div className='name_todo'>{item.useName}</div>
                          <div className='btn_edit'>
                              <FaRegEdit style={{ width: "30px", height: "18px", color: "red" }} onClick={() =>handleEdit(item)}/>
                          </div>
                          <div className='btn_delete' >
                              <MdOutlineDeleteOutline style={{ width: "50px", height: "20px", color: "red" }} onClick={() => handleDelete(item.id)} />
                          </div>
                      </div>


                  })}
                  
              </div>
          </div>
    </>
  )
}
