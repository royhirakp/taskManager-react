import { createSlice } from '@reduxjs/toolkit';
const fromErrorSluce = createSlice({
    name: "formData",
    initialState: {
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        dateOfBirthError: false,
        genderError: false,
        PhoneNoError: false,
        AddressError: false,
        EducationLevelError: false,
        EmployementLeELError: false,
        AnnualIncomeError: false,
        maritalStatusError: false
    },
    reducers: {
        setErrorData(state, action) {
            // console.log('form from slice ', action.payload)
            const { key, data } = action.payload
            switch (key) {
                case "firstName":
                    state.firstNameError = data
                    break;
                case "lastName":
                    state.lastNameError = data
                    break;
                case "email":
                    state.emailError = data
                    break;
                case "password":
                    state.passwordError = data
                    break;
                case "dateOfBirth":
                    state.dateOfBirthError = data
                    break;
                case "gender":
                    state.genderError = data
                    break;

                case "PhoneNo":
                    state.PhoneNoError = data
                    break;
                case "Address":
                    state.AddressError = data
                    break;
                case "EducationLevel":
                    state.EducationLevelError = data
                    break;
                case "EmployementLeEL":
                    state.EmployementLeELError = data
                    break;
                case "AnnualIncome":
                    state.AnnualIncomeError = data
                    break;
                case "maritalStatus":
                    state.maritalStatusError = data
                    break;
                default:
                    break;
            }
        },
    },
})

export default fromErrorSluce.reducer;
export const { setErrorData } = fromErrorSluce.actions;