import Navbar from "../../components/navbar/Navbar";
import "./styleProfile.css"
import ProfileItem from "../../components/profile/ProfileItem";
import {useEffect} from "react";

export default function Profile({socket}) {
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
        <>
            <Navbar socket={socket}/>
            <ProfileItem socket={socket}></ProfileItem>
        </>
    )
}