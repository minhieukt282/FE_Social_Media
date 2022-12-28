import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk(
    "post/getPost",
    async ()=>{
        const res = await axios.get("http://localhost:3001/posts");
        return res.data
    }
)