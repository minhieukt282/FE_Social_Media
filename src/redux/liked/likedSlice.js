import {createSlice} from "@reduxjs/toolkit";
import {getCountLikes, getLike} from "../../services/likeService";

const initialState = {
    likes: [],
    countLikes: []
}
const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLike.fulfilled, (state, action) => {
            state.likes = action.payload.data;
        })
        builder.addCase(getCountLikes.fulfilled, (state, action) => {
            state.countLikes = action.payload.data;
        })
    }
})
export default likeSlice.reducer