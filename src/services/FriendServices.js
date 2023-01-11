import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const addFriend = createAsyncThunk(
    "friend/addFriend",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post("http://118.70.117.39:3001/friends", data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)
export const getFriend = createAsyncThunk(
    "friend/getFriend",
    async (accountId) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://118.70.117.39:3001/friends/lists/${accountId}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)

export const waitingFriends = createAsyncThunk(
    "friend/waitingFriend",
    async (id) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`http://118.70.117.39:3001/friends/${id}`, {
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
        const res = await axios.patch(`http://118.70.117.39:3001/friends/${id}`, data, {
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
        const res = await axios.delete(`http://118.70.117.39:3001/friends/${id}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const unfriend = createAsyncThunk(
    "friend/unfriend",
    async (data) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.delete(`http://118.70.117.39:3001/friends/${data.accountReq}/${data.accountRes}`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res
    }
)

export const getRelationship = createAsyncThunk(
    "friend/getRelationship",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://118.70.117.39:3001/relationships', {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)

