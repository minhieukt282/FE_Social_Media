import './home.css'
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import React, {useEffect} from "react";
import AddPost from "../../components/post/AddPost";
import Navbar from "../../components/navbar/Navbar";
import RightBar from "../../components/rightBar/rightBar";

export default function Home({socket}) {
    useEffect(() => {
        if (socket != null)
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
    }, [socket])

    return (
        <div>
            <div className={'home'}>
                <Navbar socket={socket}/>
            </div>
            <div className="row">
                <Sidebar></Sidebar>
                <div className="col-6">
                    <AddPost/>
                    <Post socket={socket}/>
                </div>
                <div className="col-3"><RightBar/></div>

            </div>
        </div>
    )
}