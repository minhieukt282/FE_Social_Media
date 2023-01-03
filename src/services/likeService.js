import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createLikes = createAsyncThunk(
    "create/likes",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post('http://localhost:3001/likes', data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const deleteLikes = createAsyncThunk(
    "delete/likes",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.delete(`http://localhost:3001/likes/${data.accountId}/${data.postId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const getLike = createAsyncThunk(
    "get/likes",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://localhost:3001/likes', {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)