import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const addFriend = createAsyncThunk(
    "friend/addFriend",
    async (data) => {
        const res = await axios.get("http://localhost:3001/friends", data)
        return res
    }
)

export const waitingFriends = createAsyncThunk(
    "friend/waitingFriend",
    async (id) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://localhost:3001/friends/${id}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const acceptFriends = createAsyncThunk(
    "friend/acceptFriends",
    async (id) => {
        const token = JSON.parse(localStorage.getItem("token"))
        let data = ""
        const res = await axios.patch(`http://localhost:3001/friends/${id}`, data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const rejectFriends = createAsyncThunk(
    "friend/rejectFriends",
    async (id) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.delete(`http://localhost:3001/friends/${id}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)