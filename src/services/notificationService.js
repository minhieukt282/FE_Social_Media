import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createNotification = createAsyncThunk(
    "create/notification",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post('http://localhost:3001/notification', data,{
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const showNotification = createAsyncThunk(
    "get/notification",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://localhost:3001/notification',{
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)