import './TaskCard.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loder';

import { useDispatch, useSelector } from 'react-redux';
import { setDeleteCount, seteditTaskData } from '../../../Store/slice/TaskListSlice';
export default function TaskCard(props) {
  const [loader, setLoader] = React.useState(false)
  const Storedata = useSelector(s=>s)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    
    <Card sx={{ minWidth: 275 }} className="mainContainerCard">
        <div >
            <CardContent className='container'>
        <div className="title">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           <b><u> Title:</u></b> {props.data.title}
            </Typography>
        </div>        
        
        <div className="decribtion">
            <Typography variant="body2">
            <b><u>Description: </u> </b>{props.data.description}
            </Typography>
        </div>
        <div className='button'>
        <Button  size="small" 
        onClick={()=>{
          dispatch(seteditTaskData({status: true, data: props.data}))
          navigate('../addTask')
        }}>edit</Button>


        <Button color="error" size="small"
        onClick={async ()=>{
          setLoader(true)
          try {
            const config = {
              headers: {
                  authorization : Storedata.TaskManager.loginInfo.token                      
              }
          }
            await axios.delete (`https://task-manager-gd9n.onrender.com/task/${props.data._id}`,config)
            dispatch(setDeleteCount())            
            navigate('.././main')

          } catch (error) {
            console.log(error," error form delete")
          }
          setLoader(false)

        }}
        >delete</Button>
        </div>
      </CardContent>
        </div>
        {loader ? <Loader/>:""}
      
    </Card>
  );
}

