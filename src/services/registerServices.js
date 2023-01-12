import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const registerWed = createAsyncThunk(
    "register/getRegister",
    async (data) => {
        return await axios.post(`${constants.API_URL}/register`, data)
    }
)
