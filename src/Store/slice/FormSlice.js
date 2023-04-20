import { createSlice } from '@reduxjs/toolkit';
// import { clearAlluser } from "../actions/indexAC"
const fromSluce = createSlice({
    name: "formData",
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        PhoneNo: "",
        Address: "",
        EducationLevel: "",
        EmployementLeEL: "",
        AnnualIncome: "",
        maritalStatus: ""
    },
    reducers: {
        setData(state, action) {
            // console.log('form from slice ', action.payload)
            const { key, data } = action.payload
            switch (key) {
                case "firstName":
                    state.firstName = data
                    break;
                case "lastName":
                    state.lastName = data
                    break;
                case "email":
                    state.email = data
                    break;
                case "password":
                    state.password = data
                    break;

                case "dateOfBirth":
                    state.dateOfBirth = data
                    break;
                case "gender":
                    state.gender = data
                    break;

                case "PhoneNo":
                    state.PhoneNo = data
                    break;
                case "Address":
                    state.Address = data
                    break;
                case "EducationLevel":
                    state.EducationLevel = data
                    break;
                case "EmployementLeEL":
                    state.EmployementLeEL = data
                    break;
                case "AnnualIncome":
                    state.AnnualIncome = data
                    break;
                case "maritalStatus":
                    state.maritalStatus = data
                    break;
                default:
                    break;
            }
            // state.firstName = action.payload
        },
        // addName(state, action){

        //     return (state = action.payload)
        // },
        // addData(state, action){
        //     return (state = action.payload)
        // },
    },
    // extraReducers(builder){
    //     builder.addCase(clearAlluser, (state, action)=>{
    //         console.log(state.name,"=====state, action   ")
    //         state.name=action.payload
    //         console.log( action, "==== actuon")
    //         // return {nil:""};
    //     })
    // }

})

export default fromSluce.reducer;
export const { setData } = fromSluce.actions;