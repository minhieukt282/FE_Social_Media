import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const showMessage = createAsyncThunk(
    "message/getMessage",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`${constants.API_URL}/messages`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)