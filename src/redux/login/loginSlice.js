import {createSlice} from "@reduxjs/toolkit";
import {loginWed} from "../../services/loginServices";

const initialState = {
    accountId: JSON.parse(localStorage.getItem('accountId')),
    token: JSON.parse(localStorage.getItem('token')),
    displayName: JSON.parse(localStorage.getItem('displayName')),
    username: JSON.parse(localStorage.getItem('username'))
}

const loginSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(loginWed.fulfilled, (state, action) => {
            if (action.payload.data.message === "success"){
                state.accountId = action.payload.data.data.accountId
                state.token = action.payload.data.data.token
                state.displayName = action.payload.data.data.displayName
                state.username = action.payload.data.data.username
                if (state.accountId !== undefined && state.token !== undefined && state.displayName !== undefined) {
                    localStorage.setItem('accountId', JSON.stringify(action.payload.data.data.accountId))
                    localStorage.setItem('token', JSON.stringify(action.payload.data.data.token))
                    localStorage.setItem('displayName', JSON.stringify(action.payload.data.data.displayName))
                    localStorage.setItem('username', JSON.stringify(action.payload.data.data.username))
                }
            }
        })
    }
})
export default loginSlice.reducer