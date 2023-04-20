import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
    name:"taskArr",
    initialState: {
        loginInfo:{email:null,token:null},
        Tasks :[],
        deleteStatus: 1,
        editTask: {
            editStatus: false,
            targetTask: {}
        }
    },
    reducers:{
        setUserInfo(state,action){
            const {email, token} = action.payload;
            state.loginInfo.email = email;
            state.loginInfo.token = token;
        },
        setTaskData(state,action){
            state.Tasks = action.payload;
        },
        setDeleteCount(state, action){
            state.deleteStatus = 1+state.deleteStatus;
        },
        seteditTaskData(state, action){
            state.editTask.editStatus = action.payload.status;
            state.editTask.targetTask = action.payload.data;
        }
    }
})

export default TaskSlice.reducer;
export const { setUserInfo, setTaskData, setDeleteCount, seteditTaskData } = TaskSlice.actions;


