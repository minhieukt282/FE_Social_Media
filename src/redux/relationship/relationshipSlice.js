import {createSlice} from "@reduxjs/toolkit";
import {getRelationship} from "../../services/FriendServices";

const initialState = {
    relationship: []
}

const relationshipSlice = createSlice({
    name:'relationship',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getRelationship.fulfilled,(state,action)=>{
            state.relationship = action.payload.data
        })
    }
})

export default relationshipSlice.reducer