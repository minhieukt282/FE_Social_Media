import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getPosts = createAsyncThunk(
    'posts',
    async ()=>{
        const res = customAxios.get('posts');
        console.log(res)
        return res.data
    }
)