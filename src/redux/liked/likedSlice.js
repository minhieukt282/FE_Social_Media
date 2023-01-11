import {createSlice} from "@reduxjs/toolkit";
import {getLike} from "../../services/likeService";

const initialState = {
    likes: []
}
const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLike.fulfilled, (state, action) => {
            state.likes = action.payload.data;
        })
    }
})
export default likeSlice.reducer