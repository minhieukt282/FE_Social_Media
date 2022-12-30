import {createSlice} from "@reduxjs/toolkit";
import {registerWed} from "../../services/registerServices";

const initialState = {
    register: []
}
const registerSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(registerWed.fulfilled,(state,action)=>{
            state.posts = action.payload

        })
    }
})

export default registerSlice.reducer;