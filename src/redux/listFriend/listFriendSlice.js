import {createSlice} from "@reduxjs/toolkit";
import {getFriend} from "../../services/FriendServices";

const initialState = {
    listFriend: []
}

const listFriendSlice = createSlice({
    name:'friend',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getFriend.fulfilled,(state,action)=>{
            state.listFriend = action.payload.data
        })
    }
})

export default listFriendSlice.reducer