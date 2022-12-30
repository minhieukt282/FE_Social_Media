import {createSlice} from "@reduxjs/toolkit";
import {addPosts, getPosts} from "../../services/postServices";

const initialState = {
    posts: []
}
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data;
        });
        builder.addCase(addPosts.fulfilled, (state, action) => {
            console.log(action , 'kkkkkkkk')
            state.posts.push(action);
        })
    }
})
export default postSlice.reducer