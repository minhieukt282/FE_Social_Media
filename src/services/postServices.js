import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getPosts = createAsyncThunk(
    "posts",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://localhost:3001/posts', {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)