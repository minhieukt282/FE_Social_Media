import {createSlice} from "@reduxjs/toolkit";
import {getAccount} from "../../services/accountService";

const initialState = {
    accountInfo: []
}

const accountInfoSlice = createSlice({
    name:'accountInfo',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getAccount.fulfilled,(state,action)=>{
            state.accountInfo = action.payload.data
        })
    }
})

export default accountInfoSlice.reducer