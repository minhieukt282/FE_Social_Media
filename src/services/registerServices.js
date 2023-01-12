import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const registerWed = createAsyncThunk(
    "register/getRegister",
    async (data) => {
        return await axios.post("http://localhost:3001/register", data)
    }
)
