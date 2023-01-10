import "./rightBar.css";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriend} from "../../services/FriendServices";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function RightBar({socket}) {
    const dispatch = useDispatch()
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    useEffect(() => {
        dispatch(getFriend(accountId))
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
                                return (
                                    <li className="rightBarListItem" key={index}>
                                        <Link style={{textDecoration: "none"}} to="/message" className="profile_link">
                                            <img src={item.img} alt="" className="navbarImg"/>
                                            <FiberManualRecordIcon className="rightBarOnline"/>
                                            <span className="rightBarListItemText">{item.displayName}</span>
                                        </Link>
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

