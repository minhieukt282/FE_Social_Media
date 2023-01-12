import "./sidebar.css";
import GroupIcon from '@mui/icons-material/Group';
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from '@mui/icons-material/Chat';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import {Link, useLocation} from "react-router-dom";
import React, {useContext} from "react";
import ReactSwitch from "react-switch";
import {ThemeContext} from "../../App";

export default function Sidebar() {
    const location = useLocation()
    const {theme, setTheme} = useContext(ThemeContext);
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const imgAvt = JSON.parse(localStorage.getItem("imgAvt"))
    const displayName = JSON.parse(localStorage.getItem("displayName"))
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };
    return (
        <div style={{top: 60}} className="sidebar col-3">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link style={{textDecoration: "none"}} to={`/profile/${accountId}`}
                          className="profile_link">
                        <li className="sidebarListItem">
                            <img src={imgAvt} alt="" className="navbarImg"/>
                            <span className="sidebarDisplayName">{displayName}</span>
                        </li>
                    </Link>

                    <Link style={{textDecoration: "none"}} to={'/'} onClick={location.pathname !== '/' ? () => {
                    } : () => window.location.reload(false)}>
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

                    <div className="switch">
                        {/*<div style={{margin: 5}}> {theme === "light" ? "Light Mode" : "Dark Mode"}</div>*/}
                        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
                    </div>
                </ul>
            </div>
        </div>
    );
};

