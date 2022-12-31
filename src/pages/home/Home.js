import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import {useEffect} from "react";

import AddPost from "../../components/post/AddPost";

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
                    <AddPost></AddPost>

                    <Post socket={socket}/>


                </div>
                <div className="col-3">
                </div>
            </div>
        </div>
    )
}