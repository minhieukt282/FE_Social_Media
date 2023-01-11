import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const registerWed = createAsyncThunk(
    "register/getRegister",
    async (data) => {
        const res = await axios.post("http://118.70.117.39:3001/register", data);
        return res
    }
)