import React, {useEffect} from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import {Outlet, useNavigate} from "react-router-dom";
import RightBar from "../components/rightBar/RightBar";
import {useSelector} from "react-redux";
import {constants} from "../constants";

export default function Init({socket}) {
    const navigate = useNavigate()
    useEffect(() => {
        if (socket != null) {
            socket.emit("refresh", {
                accountId: JSON.parse(localStorage.getItem(constants.ACCOUNT_ID))
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
            <div className="main" style={{marginTop:60}}>
                <div className="row">
                    <div className="col-3 sidebar-left">
                        <Sidebar/>
                    </div>
                    <div className="col-6 main-content">
                        <Outlet/>
                    </div>
                    <div className="col-3 mediaRight sidebar-right">
                        <RightBar socket={socket}/>
                    </div>
                </div>

            </div>

        </div>
    )
}
