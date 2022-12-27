import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Link} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo"><img src="image/logo/Facebook_Logo.png"
                                                style={{width: 50, height: 50, marginTop: 5}}/></span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon"/>
                    <input
                        type="text"
                        placeholder="Search for friends post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <i className="fa-solid fa-user-group"></i>
                        {/*<span className="navbarIconBadge">2</span>*/}
                    </div>
                    <div className="navbarIconItem">
                        <i className="fa-solid fa-message"></i>
                        {/*<span className="navbarIconBadge">10</span>*/}
                    </div>
                    <div className="navbarIconItem">
                        <i className="fa-solid fa-bell"></i>
                        {/*<span className="navbarIconBadge">8</span>*/}
                    </div>
                </div>
            </div>
            <Link to="/">
                <img src="image/avatar/images.jpg" alt="" className="navbarImg"/>
            </Link>
        </div>
    );
};

export default Navbar;
