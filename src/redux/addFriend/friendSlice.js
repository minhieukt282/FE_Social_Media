import {createSlice} from "@reduxjs/toolkit";
import {waitingFriends} from "../../services/FriendServices";

const initialState = {
    waitingFriend: []
}

const waitingFriendSlice = createSlice({
    name:'waitingFriend',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(waitingFriends.fulfilled,(state,action)=>{
            state.waitingFriend = action.payload.data
        })
    }
})

export default waitingFriendSlice.reducer