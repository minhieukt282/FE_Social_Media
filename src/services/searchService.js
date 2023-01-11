import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getSearch = createAsyncThunk(
    "search/getSearch",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://118.70.117.39:3001/search/${data}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)

