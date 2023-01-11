import React, {useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AddPost from "../../components/post/AddPost";
import Post from "../../components/post/Post";
import RightBar from "../../components/rightBar/rightBar";

export default function Message({socket}){
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
                <div className="col-3">
                    <Sidebar/>
                </div>
                <div className="col-6">
                    <h1>Message</h1>
                </div>
                <div className="col-3 mediaRight">
                    <RightBar socket={socket}/>
                </div>
            </div>
        </div>
    )
}