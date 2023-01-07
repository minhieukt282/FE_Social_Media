import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showFriend = createAsyncThunk(
    "friend/getFriend",
    async (data)=>{
        const res = await  axios.get("")
    }
)