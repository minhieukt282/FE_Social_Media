import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
    "posts/get",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://localhost:3001/posts', {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res;
    }
)

export const addPosts = createAsyncThunk(
    "posts/add",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token)
        const res = await axios.post('http://localhost:3001/posts', data, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
        )
        return res.data;
    }
)