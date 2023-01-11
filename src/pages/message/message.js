import React, {useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import RightBar from "../../components/rightBar/rightBar";
import Chat from "../../components/cardMessage/chat";

export default function Message({socket}){
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
            socket.emit("findUser", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
        }
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
                    <h2 style={{paddingTop: 20, paddingLeft: 10}}>Message</h2>
                    <hr/>
                    <Chat socket={socket}/>
                </div>
                <div className="col-3 mediaRight">
                    <RightBar socket={socket}/>
                </div>
            </div>
        </div>
    )
}