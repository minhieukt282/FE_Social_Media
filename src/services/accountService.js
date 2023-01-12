import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAccount = createAsyncThunk(
    "account/getAccount",
    async (accountId) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://localhost:3001/accounts/${accountId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }

)
export const editAccount = createAsyncThunk(
    "account/editAccount",
    async (data)=>{
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.patch(`http://localhost:3001/accounts`,data,{
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        console.log(res.data.data)
        return res.data.data
    }
)