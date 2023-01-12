import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showMessage = createAsyncThunk(
    "message/getMessage",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://localhost:3001/messages`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)