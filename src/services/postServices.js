import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {constants} from "../constants";

export const getPosts = createAsyncThunk(
    "posts/get",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get(`${constants.API_URL}/posts`, {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        return res;
    }
)

export const addPosts = createAsyncThunk(
    "posts/add",
    async (data) => {
    const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post(`${constants.API_URL}/posts`, data, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
        )
        return res.data.data;
    }
)

export const deletePosts = createAsyncThunk(
    "posts/delete",
    async (postId) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.delete(`${constants.API_URL}/posts/${postId}`, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
        )
        return postId
    }
)

export const editPosts = createAsyncThunk(
    "posts/edit",
    async (data) => {
        console.log('dataEdit', data)
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.patch(`${constants.API_URL}/posts/${data.postId}`, data, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
        )
        return res
    }
)