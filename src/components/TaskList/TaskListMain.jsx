import React, { useEffect, useState } from 'react'
import './TaskListMain.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TaskCard from './TaskCard/TaskCard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../Loader/Loder';
import { useRef } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setTaskData } from '../../Store/slice/TaskListSlice';
import { setUserInfo } from '../../Store/slice/TaskListSlice';
const TaskListMain = () => {
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  let Storedata = useSelector(s=>s)
  let {deleteStatus} = Storedata.TaskManager
  const tempFunction = useRef()

  const navgate = useNavigate()
  function handelAddTask(){
    navgate('../addTask')
  }

 async function getData(){
  if(Storedata.TaskManager.loginInfo.token === ""){
    navgate('../')
    return;
  }
 
    try {
      setLoader(true)
      const config = {
        headers: {
            authorization : Storedata.TaskManager.loginInfo.token                      
        }
    }
    const res = await axios.get (`https://task-manager-gd9n.onrender.com/task`,config)
    // console.log(res.data.data)
    dispatch(setTaskData(res.data.data))
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  tempFunction.current = getData

  useEffect(()=>{    
    tempFunction.current();
  },[deleteStatus])
  return (
    <div>
        {loader ? <Loader/>:""}
        <h1 style={{"textAlign":"center"}}>Task Manager</h1>
        <nav>
            <div className="UserInformation">
                <p>Nmae:</p>
                <p>User email: {Storedata.TaskManager.loginInfo.email}</p>
            </div>
            <Stack direction="row" spacing={5}>
            <Button variant="contained" color="success"
            onClick={handelAddTask}
            >Add Task</Button>
            <Button variant="contained" color="success"
            onClick={()=>{
              dispatch(setUserInfo({email: "", token: ""}))
              navgate('../')
            }}
            >logout</Button>
            </Stack>
        </nav>
        <main className='mainLIST'>
          {Storedata.TaskManager.Tasks?.map((item,indx)=>{
            return (
              <TaskCard data={item} key={indx*55}/>
            )
          })}
        </main>
    </div>
  )
}

export default TaskListMain
