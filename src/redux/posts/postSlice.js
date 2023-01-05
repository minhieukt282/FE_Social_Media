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
            state.posts = action.payload.data.data;
        });
        builder.addCase(addPosts.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts]
        })
    }
})
export default postSlice.reducer