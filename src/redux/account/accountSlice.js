import {createSlice} from "@reduxjs/toolkit";
import {editAccount, getAccount} from "../../services/accountService";

const initialState = {
    accountInfo: [],
    accountId: JSON.parse(localStorage.getItem('accountId')),
    displayName: JSON.parse(localStorage.getItem('displayName')),
    imgAvt: JSON.parse(localStorage.getItem('imgAvt'))

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
            localStorage.setItem('accountId', JSON.stringify(action.payload[0].accountId))
            localStorage.setItem('displayName', JSON.stringify(action.payload[0].displayName))
            localStorage.setItem('imgAvt', JSON.stringify(action.payload[0].img))
            state.accountInfo = action.payload[0]
        })
    }
})

export default accountInfoSlice.reducer