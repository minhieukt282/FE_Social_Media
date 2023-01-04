import Navbar from "../../components/navbar/Navbar";
import "./styleProfile.css"
import ProfileItem from "../../components/profile/profile";

export default function Profile(socket) {
    return (
        <>
            <Navbar></Navbar>
            <ProfileItem socket={socket}></ProfileItem>
        </>
    )
}