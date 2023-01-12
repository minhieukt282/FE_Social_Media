import "./rightBar.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriend} from "../../services/FriendServices";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import UserOnline from "./UserOnline";

export default function RightBar({socket}) {
    const dispatch = useDispatch()
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const [listUser, setListUser] = useState([])
    let isOnline = false

    useEffect(() => {
        dispatch(getFriend(accountId))
        socket?.on("userOnline", data => {
            setListUser(data.listUser)
        })
        if (socket != null){
            socket.emit("findUser", {
                accountId: JSON.parse(localStorage.getItem("accountId"))
            })
        }
    }, [socket])

    const listFriends = useSelector(state => {
        return state.listFriend.listFriend
    })

    return (
        <div style={{top: 80}} className="rightBar">
            <div className="rightBarWrapper">
                <h2>Online</h2>
                <hr/>
                <ul className="rightBarList">
                    {
                        listFriends.map((item, index) => {
                            if (item.accountId !== accountId) {
                                for (let i = 0; i < listUser.length; i++) {
                                    if (listUser[i].accountId === item.accountId) {
                                        isOnline = true
                                        break
                                    }
                                }
                                return (
                                    <li className="rightBarListItem" key={index}>
                                        <UserOnline item={item} isOnline={isOnline}/>
                                    </li>
                                )
                            }

                        })
                    }
                </ul>
            </div>
        </div>
    );
};