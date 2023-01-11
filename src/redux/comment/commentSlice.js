import {createSlice} from "@reduxjs/toolkit";
import {addComments, deleteComments} from "../../services/commentService";


const initialState ={
comments:[]
}
const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},

    extraReducers: builder => {
        builder.addCase(addComments.fulfilled,(state, action)=>{
            state.comments = [ ...state.comments,action.payload]
        })
        builder.addCase(deleteComments.fulfilled,(state, action)=>{
            state.comments = state.comments.filter(item=>item.commentId !== action.payload)
        })
    }
})

export default commentSlice.reducer