import './home.css'
import Post from "../../components/post/Post";
import React, {useEffect} from "react";
import AddPost from "../../components/post/AddPost";
import {getPosts} from "../../services/postServices";
import {useDispatch} from "react-redux";
import showStory from "../../components/Story/storyTop";

export default function Home({socket}) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
        }
        socket?.on("allComment", data => {
            dispatch(getPosts())
        })
    }, [socket])

    return (
        <>
            <showStory/>
            <AddPost/>
            <Post socket={socket} url={null}/>
        </>
    )
}