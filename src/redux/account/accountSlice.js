import {createSlice} from "@reduxjs/toolkit";
import {editAccount, getAccount} from "../../services/accountService";

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
        builder.addCase(editAccount.fulfilled,(state, action)=>{
            let newArr = [...state.accountInfo]
            let index = newArr.findIndex((item)=> item.accountId === action.payload.data);
            newArr.splice(index,1, action.payload.data)
            state.accountInfo = newArr
        })
    }
})

export default accountInfoSlice.reducer