import {createSlice} from "@reduxjs/toolkit";
import {getPost} from "../../services/postServices";

const initialState = {
    posts: []
}
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getPost.fulfilled,(state,action)=>{
            state.posts = action.payload
        })
    }
})

export default postSlice.reducer;