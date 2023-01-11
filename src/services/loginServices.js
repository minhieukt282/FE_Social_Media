import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loginWed = createAsyncThunk(
    "login/getLogin",
    async (data) => {
        const res = await axios.post("http://118.70.117.39:3001/login", data);
        return res.data
    }
)