import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAccount = createAsyncThunk(
    "account/getAccount",
    async (accountId) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://localhost:3001/${accountId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)