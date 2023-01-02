import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import MultiActionAreaCard from "../../components/cardFriend/card";
import {useEffect} from "react";

export default function AddFriend({socket}) {
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
                    <h2 style={{paddingTop:40}}>Lời mời kết bạn</h2>
                    <hr/>
                    <div className="row">
                        <MultiActionAreaCard socket={socket}></MultiActionAreaCard>
                    </div>
                </div>
            </div>
        </div>
    )
}