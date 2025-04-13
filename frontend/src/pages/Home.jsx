import React, { useCallback, useEffect, useState } from "react";
import Card from "../component/Card";
import toast from "react-hot-toast";
import { BackendUrl } from "../utils/BackendUrl";


export default function Home() {
  const [tasks, setTasks] = useState([])
  const GetAllData =useCallback(async()=>{
    try{
      const response = await fetch(`${BackendUrl}/task`,{
        method: 'GET',
        credentials:'include'
      })
      const result = await response.json()
      if(response.ok){
        setTasks(result.tasks)
      }
      
    }catch(error){
      toast.error(error.message)
    }
  },[])
  const MarkAsDone =useCallback(async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/task/${id}`,{
        method: 'PUT',
        credentials: 'include',
      })
      const result = await response.json()
      if(response.ok){
        GetAllData()
        toast.success(result.message)
      }else{
        toast.error(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  },[])
  const DeleteTask =useCallback(async(id)=>{
    try{
      const response = await fetch(`${BackendUrl}/task/${id}`, {
        method:'DELETE',
        credentials: 'include'
      })
      const result = await response.json()
      if(response.ok){
        toast.success(result.message)
        GetAllData()
      }else{
        toast.error(result.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  },[])
  useEffect(()=>{
    GetAllData()
  },[])
  return (
    <>
    <div className="flex flex-col w-32 gap-2 mt-20 ml-10">
      <p className="p-1 text-xl text-center bg-green-500 rounded-md">Pending</p>
      <h1 className="p-1 text-xl text-center bg-yellow-200 rounded-md">Mark Done</h1>
    </div>
    <div className="flex flex-wrap justify-center gap-5 py-10 ">
      {tasks.map((item)=>(
        <Card title={item.title} content={item.content} cretedAt={item.cretedAt} key={item._id} done={item.done} ondelete={()=> DeleteTask(item._id)} onMarkAsdone={()=>MarkAsDone(item._id) }/>
      ))}
    </div>
    </>
    
  );
}
