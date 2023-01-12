import "./sidebar.css";
import GroupIcon from '@mui/icons-material/Group';
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from '@mui/icons-material/Chat';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
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
                    <Link style={{textDecoration: "none"}} to={`/profile/${accountInfo.accountId}`}
                          className="profile_link">
                        <li className="sidebarListItem">
                            <img src={accountInfo.imgAvt} alt="" className="navbarImg"/>
                            <span className="sidebarDisplayName">{accountInfo.displayName}</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/">
                        <li className="mb-3">
                            <RssFeedIcon className="sidebarIcon"></RssFeedIcon>
                            <span className="sidebarListItemText">Feed</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/friends">
                        <li className="mb-3">
                            <GroupIcon className="sidebarIcon"></GroupIcon>
                            <span className="sidebarListItemText">Friends</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <EventIcon className="sidebarIcon"></EventIcon>
                            <span className="sidebarListItemText">Events</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <ChatIcon className="sidebarIcon"></ChatIcon>
                            <span className="sidebarListItemText">Chat</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <VideocamIcon className="sidebarIcon"></VideocamIcon>
                            <span className="sidebarListItemText">Video</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <Diversity3Icon className="sidebarIcon"></Diversity3Icon>
                            <span className="sidebarListItemText">Group</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <StorefrontIcon className="sidebarIcon"></StorefrontIcon>
                            <span className="sidebarListItemText">Market</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to="/404">
                        <li className="mb-3">
                            <StarIcon className="sidebarIcon"></StarIcon>
                            <span className="sidebarListItemText">Favorite</span>
                        </li>
                    </Link>
                    <hr/>

                </ul>
            </div>
        </div>
    );
};

