import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Post from "../../components/post/Post";

export default function Profile() {
    return (
        <>
            <div className="profile">
                <Navbar></Navbar>
            </div>
            <div className="row">
                <Sidebar></Sidebar>
                <div className="col-5">
                </div>
                <div className="col-7">
                </div>
            </div>
        </>
    )
}