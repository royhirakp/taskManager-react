import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AddTask.css'
import axios from 'axios';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loder';
import { seteditTaskData } from '../../Store/slice/TaskListSlice';
export default function AddTask() {
  const Storedata = useSelector(s => s)
  let {editStatus, targetTask } = Storedata.TaskManager.editTask
  const {description,_id, title} = targetTask
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titleIn, setTitele] = React.useState('')
  const [describTion, setdescribTion] = React.useState('')
  const [loader, setLoader] = React.useState(false)
  const tempFunction = React.useRef()
tempFunction.current = ()=>{
  if(editStatus){
    setTitele(title)
    setdescribTion(description)
  }
}
  React.useEffect(()=>{
    tempFunction.current()
  },[])

  async function handelAddTask() {
    setLoader(true)
    try {
      if(editStatus){
        console.log(editStatus, titleIn , describTion )
        await axios.put(`https://task-manager-gd9n.onrender.com/task/${_id}`, {
          title: titleIn,
          description: describTion
        },
          {
            headers: {
              authorization: Storedata.TaskManager.loginInfo.token
            }
          })
          
          dispatch(seteditTaskData({status: false, data: {}}))

      }else{
        await axios.post('https://task-manager-gd9n.onrender.com/task', {
          title: titleIn,
          description: describTion
        },
          {
            headers: {
              authorization: Storedata.TaskManager.loginInfo.token
            }
          })
      }
      navigate('../main')
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  return (
    <div className='Fromcontainere'>
      {loader ? <Loader/>: ""}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '80%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="fullWidth"
            label="Title"
            size='5'
            defaultValue={ editStatus ? title : titleIn}
            onChange={(e) => setTitele(e.target.value)}
          />
          <TextField
            id="outlined-error-helper-text"
            label="Decribtion"
            fullWidth
            defaultValue={editStatus ? description : describTion}
            onChange={(e) => setdescribTion(e.target.value)}
          />
        </div>
        <Button id='addButton'
          onClick={handelAddTask}
          variant="contained" color="success">{editStatus ? "edit" : "Add Task"}</Button>
      </Box>
    </div>
  );
}

