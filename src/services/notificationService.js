import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const createNotification = createAsyncThunk(
    "create/notification",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post(`${constants.API_URL}/notification`, data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const deleteNotification = createAsyncThunk(
    "delete/notification",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.delete(`${constants.API_URL}/notification/${data.accountSent}/${data.postId}/${data.type}`, {
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
        const res = await axios.get(`${constants.API_URL}/notification`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)