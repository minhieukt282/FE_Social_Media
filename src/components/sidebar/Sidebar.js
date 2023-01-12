import "./sidebar.css";
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import ReactSwitch from "react-switch";
import {ThemeContext} from "../../App";

export default function Sidebar() {
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
                    <Link style={{textDecoration: "none"}} to="/">
                        <li className="mb-3">
                            <HomeIcon className="sidebarIcon"></HomeIcon>
                            <span className="sidebarListItemText">Home</span>
                        </li>
                    </Link>
                    <Link style={{textDecoration: "none"}} to="/friends">
                        <li className="mb-3">
                            <GroupIcon className="sidebarIcon"></GroupIcon>
                            <span className="sidebarListItemText">Friends</span>
                        </li>
                    </Link>
                    <Link style={{textDecoration: "none"}} to="/friends">
                        <li className="mb-3">
                            <ChatIcon className="sidebarIcon"></ChatIcon>
                            <span className="sidebarListItemText">Chat</span>
                        </li>
                    </Link>
                    <div className="switch">
                        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
                    </div>
                </ul>
            </div>
        </div>
    );
};

