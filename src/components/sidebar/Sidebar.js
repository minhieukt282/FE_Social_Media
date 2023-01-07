import "./sidebar.css";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export default function Sidebar() {
    const accountInfo = useSelector(state => {
        return state.loginWed
    })
    return (
        <div style={{top: 60}} className="sidebar col-3">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link style={{textDecoration: "none"}} to={`/profile/${accountInfo.accountId}`} className="profile_link">
                        <li className="sidebarListItem">
                            <img src={accountInfo.imgAvt} alt="" className="navbarImg"/>
                            <span className="sidebarListItemText">{ accountInfo.displayName}</span>
                        </li>
                    </Link>
                    <Link style={{textDecoration: "none"}} to="/home">
                        <li className="sidebarListItem">
                            <HomeIcon className="sidebarIcon"></HomeIcon>
                            <span className="sidebarListItemText">Home</span>
                        </li>
                    </Link>
                    <Link style={{textDecoration: "none"}} to="/friends">
                        <li className="sidebarListItem">
                            <GroupIcon  className="sidebarIcon"></GroupIcon >
                            <span className="sidebarListItemText">Friends</span>
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <YouTubeIcon className="sidebarIcon"></YouTubeIcon>
                        <span className="sidebarListItemText">Video</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon"></ChatIcon>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

