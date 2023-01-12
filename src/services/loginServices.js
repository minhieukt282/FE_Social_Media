import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const loginWed = createAsyncThunk(
    "login/getLogin",
    async (data) => {
        const res = await axios.post(`${constants.API_URL}/login`, data);
        return res.data
    }
)