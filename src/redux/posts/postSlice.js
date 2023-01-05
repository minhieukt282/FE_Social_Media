import {createSlice} from "@reduxjs/toolkit";
import {addPosts, getPosts, deletePosts, editPosts} from "../../services/postServices";

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
            state.posts = [action.payload, ...state.posts];
        });

        builder.addCase(deletePosts.fulfilled, (state, action) => {
            state.posts = state.posts.filter(item => item.postId !== action.payload)
        });

        builder.addCase(editPosts.fulfilled, (state, action) => {
            let newArr = [...state.posts];
            let index = newArr.findIndex((item) => item.postId == action.payload.data.postId)
            newArr.splice(index, 1, action.payload.data.data)
            state.posts = newArr
        });
    }
})
export default postSlice.reducer