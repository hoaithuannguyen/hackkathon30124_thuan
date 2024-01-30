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
    console.log("usersusersusersusers", users);
    
    console.log(users);
    const handleDelete = async (id:number) => {
        try {
            const response = await publicAxios.delete(`/api/v1/user/${id}`); 
            console.log(response.data.data)                       
            // setUsers(response.data.data);
        } catch (error) { 
            console.log("error", error);
            
        }
    };
  return (
    <>
          <div className='container'>
              <div className='container_1'>DANH SÁCH CÔNG VIỆC</div>
              <div className='container_2'>
                  <input type="text"/>
                  <button className='btn_add'>
                      Thêm
                  </button>
              </div>
             
              <div>
                  {users.map((item: todoList, index: any) => {
                      return <div className='container_3' key={index}>
                          <div className='check_box'>
                              {/* <input type="checkbox" checked={item.status} onChange={(e) => handleChangeStatus(e, item.id)} /> */}
                              <input type="checkbox" checked={item.status}/>

                          </div>
                          <div className='name_todo'>{item.useName}</div>
                          <div className='btn_edit'>
                              <FaRegEdit style={{ width: "30px", height: "18px", color: "red" }}/>
                          </div>
                          <div className='btn_delete' >
                              <MdOutlineDeleteOutline style={{ width: "50px", height: "20px", color: "red" }} onClick={() => handleDelete(item.id)} />
                          </div>
                      </div>


                  })}
                  {/* <div className='check_box'>
                        <input type="checkbox" />
                    </div>
                    <div className='name_todo'>danh sach cong viec khi duoc in ra</div>
                    <div className='btn_edit'>
                        <FaRegEdit style={{ width: "30px", height: "18px", color: "red" }} />
                    </div>
                    <div className='btn_delete'>
                        <MdOutlineDeleteOutline style={{ width: "50px", height: "20px", color: "red" }} />
                    </div> */}
              </div>
          </div>
    </>
  )
}
