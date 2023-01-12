import {createSlice} from "@reduxjs/toolkit";
import {editAccount, getAccount} from "../../services/accountService";

const initialState = {
    accountInfo: {}
}

const accountInfoSlice = createSlice({
    name: 'accountInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAccount.fulfilled, (state, action) => {
            state.accountInfo = action.payload.data
        })
        builder.addCase(editAccount.fulfilled, (state, action) => {
            state.accountInfo = action.payload[0]
        })
    }

})

export default accountInfoSlice.reducer