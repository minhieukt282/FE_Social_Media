import {createSlice} from "@reduxjs/toolkit";
import {getPosts} from "../../services/postServices";
const initialState ={
    posts:[]
}
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPosts.fulfilled,(state, action)=>{
            // console.log(action.payload)
            state.posts = action.payload.data;
        })
    }
})
export default postSlice.reducer