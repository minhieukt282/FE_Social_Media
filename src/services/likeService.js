import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const createLikes = createAsyncThunk(
    "create/likes",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post(`${constants.API_URL}/likes`, data, {
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
        const res = await axios.delete(`${constants.API_URL}/likes/${data.accountId}/${data.postPostId}`, {
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
        const res = await axios.get(`${constants.API_URL}/likes`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)
