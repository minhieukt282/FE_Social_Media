import {createSlice} from "@reduxjs/toolkit";
import {showNotification} from "../../services/notificationService";
import {toast} from "react-toastify";

const initialState = {
    notification: []
}

const notificationSlice = createSlice({
    name: 'showNotification',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(showNotification.fulfilled, (state, action) => {

            state.notification = action.payload.data
        })
    }
})

export default notificationSlice.reducer