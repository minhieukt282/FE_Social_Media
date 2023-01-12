import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const getAccount = createAsyncThunk(
    "account/getAccount",
    async (accountId) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`${constants.API_URL}/accounts/${accountId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)
export const editAccount = createAsyncThunk(
    "account/editAccount",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.patch(`${constants.API_URL}/accounts`, data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data.data
    }
)