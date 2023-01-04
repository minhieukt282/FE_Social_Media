import Navbar from "../../components/navbar/Navbar";
import "./styleProfile.css"
import ProfileItem from "../../components/profile/profile";
import {useEffect} from "react";

export default function Profile({socket}) {
    useEffect(() => {
        if (socket != null)
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
    }, [socket])
    return (
        <>
            <Navbar></Navbar>
            <ProfileItem socket={socket}></ProfileItem>
        </>
    )
}