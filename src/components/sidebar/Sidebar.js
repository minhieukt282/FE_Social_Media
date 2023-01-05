import "./sidebar.css";
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";
import React from "react";

export default function Sidebar() {
    return (
        <div style={{top:60}} className="sidebar col-3">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link style={{textDecoration:"none"}} to="/home">
                    <li  className="sidebarListItem" >
                        <HomeIcon className="sidebarIcon"></HomeIcon>
                        <span className="sidebarListItemText">Home</span>
                    </li>
                    </Link>

                    <li  className="sidebarListItem" >
                        <Link style={{textDecoration: "none"}} to="/addFriend">
                            <PeopleIcon className="sidebarIcon"></PeopleIcon>
                            <span className="sidebarListItemText">Friend Request</span>
                        </Link>
                    </li>

                    <li  className="sidebarListItem" >
                        <YouTubeIcon className="sidebarIcon"></YouTubeIcon>
                        <span className="sidebarListItemText">Video</span>
                    </li>

                    <li  className="sidebarListItem" >
                        <ChatIcon className="sidebarIcon"></ChatIcon>
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                </ul>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                </ul>
               <span></span>
            </div>
        </div>
    );
};

// <div className="navbarCenter">
//     <Link style={{textDecoration: "none", marginRight: 50}} to="/home" className="fa-solid fa-house"></Link>
//
//     <Link style={{textDecoration: "none", marginLeft: 50}} to="/addFriend"
//           className="fa-solid fa-users"></Link>
//
//     <Link style={{textDecoration: "none", marginLeft: 100}} className="fa-brands fa-youtube"></Link>
//
//     <Link style={{textDecoration: "none", marginLeft: 100}} className="fa-solid fa-house"></Link>
//
// </div>

