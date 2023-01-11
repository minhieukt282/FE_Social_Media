import {createSlice} from "@reduxjs/toolkit";
import {showMessage} from "../../services/messageService";

const initialState = {
    message: []
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(showMessage.fulfilled, (state, action) => {
            state.message = action.payload.data
        })
    }
})

export default messageSlice.reducer