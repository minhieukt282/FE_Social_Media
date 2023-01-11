import {createSlice} from "@reduxjs/toolkit";
import {getSearch} from "../../services/searchService";

const initialState = {
    searchResult: {}
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getSearch.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.searchResult = action.payload.data
        })
    }
})

export default searchSlice.reducer