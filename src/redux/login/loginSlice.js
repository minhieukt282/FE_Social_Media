import {createSlice} from "@reduxjs/toolkit";
import {loginWed} from "../../services/loginServices";

const initialState = {
    accountId: JSON.parse(localStorage.getItem('accountId')),
    token: JSON.parse(localStorage.getItem('token')),
    displayName: JSON.parse(localStorage.getItem('displayName')),
    imgAvt: JSON.parse(localStorage.getItem('imgAvt'))
}

const loginSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(loginWed.fulfilled, (state, action) => {
            if (action.payload.message === "success"){
                state.accountId = action.payload.data.accountId
                state.token = action.payload.data.token
                state.displayName = action.payload.data.displayName
                state.imgAvt = action.payload.data.imgAvt
                if (state.accountId !== undefined && state.token !== undefined && state.displayName !== undefined) {
                    localStorage.setItem('accountId', JSON.stringify(action.payload.data.accountId))
                    localStorage.setItem('token', JSON.stringify(action.payload.data.token))
                    localStorage.setItem('displayName', JSON.stringify(action.payload.data.displayName))
                    localStorage.setItem('imgAvt', JSON.stringify(action.payload.data.imgAvt))
                }
            }
        })
    }
})
export default loginSlice.reducer