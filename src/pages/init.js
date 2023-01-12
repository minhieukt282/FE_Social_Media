import React, {useEffect} from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import RightBar from "../components/rightBar/rightBar";
import {useSelector} from "react-redux";

export default function Init({socket}) {
    const navigate = useNavigate()
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })

        }
    }, [socket])

    const user = useSelector(state => {
        return state.loginWed.token
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

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
                    <Outlet/>
                </div>
                <div className="col-3 mediaRight">
                    <RightBar socket={socket}/>
                </div>
            </div>
        </div>
    )
}