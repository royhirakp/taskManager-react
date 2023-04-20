import { createSlice } from "@reduxjs/toolkit";

const PageNoSlice = createSlice({
    name:"pageNoSlice",
    initialState : 1,
    reducers :{
        nextPage(state, action){
            if(state < 4)
            return(state = state + 1)
        }, 
        prevPage(state, action){
            if(state > 0)
            return (state = state - 1)
        },
        setPage(state, action){
            // console.log('sicie of page commingg.....', action.payload)
           return ( state = action.payload)
        }
    }
})

export default PageNoSlice.reducer;
export const {nextPage, prevPage, setPage } = PageNoSlice.actions