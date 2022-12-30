import './home.css'
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import Sidebar from "../../components/sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";


export default function Home({socket}) {
    useEffect(() => {
        if (socket != null)
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
    }, [socket])

    return (
        <>
            <div className={'home'}>
                <Navbar socket={socket}/>
            </div>
            <Outlet></Outlet>
            <div className="row">
                <Sidebar></Sidebar>
                <div className="col-6">
                    <Post socket={socket}/>
                </div>
                <div className="col-3">
                </div>
            </div>
        </>
    )
}