import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
    "posts/get",
    async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.get('http://localhost:3001/posts', {
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
        const res = await axios.post('http://localhost:3001/posts', data, {
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
        const res = await axios.delete(`http://localhost:3001/posts/${postId}`, {
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
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.patch(`http://localhost:3001/posts/${data.postId}`, data, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
        )
        return res
    }
)