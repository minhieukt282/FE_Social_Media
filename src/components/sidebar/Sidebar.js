import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

export default function Sidebar() {
    const posts = useSelector(state => {
        console.log(state)
        return state.loginWed
    })
    return (
        <div style={{top: 20}} className="sidebar col-3">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    {/*<div style={{paddingRight: 20}}>*/}
                    <Link style={{textDecoration: "none"}} to="/profile" className="profile_link">
                        <li className="sidebarListItem">
                            <img src="image/avatar/images.jpg" alt="" className="navbarImg"/>
                            <span className="sidebarListItemText">   {posts.displayName}</span>
                        </li>
                    </Link>
                    {/*</div>*/}
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
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                </ul>
                <span></span>
            </div>
        </div>
    );
};

