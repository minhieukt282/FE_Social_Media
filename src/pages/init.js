import React, {useEffect} from "react";
import Navbar from "../components/navbar/Navbar";
import {Outlet, useNavigate} from "react-router-dom";
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
            <Outlet/>
        </div>
    )
}
