import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const addFriend = createAsyncThunk(
    "friend/addFriend",
    async (data) => {
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.post(constants.API_URL + "/friends", data, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.get(`${constants.API_URL}/friends/lists/${accountId}`, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.get(`${constants.API_URL}/friends/${id}`, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        let data = ""
        const res = await axios.patch(`${constants.API_URL}/friends/${id}`, data, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.delete(`${constants.API_URL}/friends/${id}`, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.delete(`${constants.API_URL}/friends/${data.accountReq}/${data.accountRes}`, {
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
        const token = JSON.parse(localStorage.getItem(constants.TOKEN_KEY))
        const res = await axios.get(`${constants.API_URL}/relationships`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res.data
    }
)

