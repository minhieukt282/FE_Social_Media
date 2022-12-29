import React from "react";
import {Link} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/home" style={{textDecoration: "none"}}>
                    <span className="logo">
                        <img src="https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png"
                             style={{width: 50, height: 50, marginTop: 5}}
                             alt="clear"/>
                    </span>
                </Link>
                <div className="searchBar">
                    <Link className="searchIcon">
                        <svg style={{marginBottom: 15}} xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor"
                             className="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </Link>
                    <input
                        type="text"
                        placeholder="Search on facebook"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="navbarCenter">
                    <Link style={{textDecoration:"none",marginRight:50}} to="/home" className="fa-solid fa-house"></Link>

                    <Link style={{textDecoration:"none",marginLeft:50}} to="/addFriend" className="fa-solid fa-users"></Link>

                    <Link style={{textDecoration:"none",marginLeft:100}} className="fa-brands fa-youtube"></Link>

                    <Link style={{textDecoration:"none",marginLeft:100}} className="fa-solid fa-house"></Link>

            </div>
            <div className="navbarRight">
                <Link to="/" className="profile_link">
                    <img src="image/avatar/images.jpg" alt="" className="navbarImg"/>
                    <span>name</span>
                </Link>
                <div className="navbarIconItem1">
                    <Link style={{paddingRight: 40}} className="fa-solid fa-comment-dots"></Link>
                </div>
                <div className="navbarIconItem1">
                    <Link style={{paddingRight: 40}} className="fa-solid fa-bell"></Link>
                    <div className="right_notification">5</div>
                </div>
                <div className="dropdown">
                    <Link type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false">
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                        <Link className="dropdown-item" href="#">Setting</Link>
                        <Link className="dropdown-item" href="#">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
