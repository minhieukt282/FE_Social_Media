import './home.css'
import Post from "../../components/post/Post";
import React, {useEffect} from "react";
import AddPost from "../../components/post/AddPost";

export default function Home({socket}) {
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })

        }
    }, [socket])

    return (
        <>
            <AddPost/>
            <Post socket={socket} url={null}/>
        </>
    )
}