import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const getSearch = createAsyncThunk(
    "search/getSearch",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`${constants.API_URL}/search/${data}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)

