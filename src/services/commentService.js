import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const addComments = createAsyncThunk(
    "comment/add",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post('http://118.70.117.39:3001/comments', data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data.data
    }
)

export const deleteComments = createAsyncThunk(
    "comment/delete",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.delete(`http://118.70.117.39:3001/comments/${data.accountId}/${data.postPostId}/${data.commentId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res

    }
)