import React, {useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ListFriendCard from "../../components/listFriend/ListFriendCard";

export default function ListFriend({socket}){
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
                    <Sidebar></Sidebar>
                </div>
                <div className="col-6">
                    <h2 style={{paddingTop: 40}}>Friends list</h2>
                    <hr/>
                    <div className="row">
                        <ListFriendCard socket={socket}/>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}