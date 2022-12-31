import React from "react";
import {Link} from "react-router-dom";
import "./navbar.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../../services/notificationService";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';

const Navbar = ({socket}) => {
    const dispatch = useDispatch()
    const [noticeCome, setNoticeCome] = useState(false)
    const accountId = JSON.parse(localStorage.getItem('accountId'))

    useEffect(() => {
        dispatch(showNotification())
    }, [noticeCome])

    useEffect(() => {
        socket?.on("getNotification", data => {
            setNoticeCome(true)
        })
    }, [socket])

    const notifications = useSelector(state => {
        return state.notification.notification
    })

    const imgAvt = useSelector(state => {
        return state.loginWed.imgAvt
    })

    const handleLogout = (accountId) => {
        localStorage.clear()
        socket.emit("offline", {accountId: accountId})
    }

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/home" style={{textDecoration: "none"}}>
                    <span className="logo">
                        <img
                            src="https://1.bp.blogspot.com/-S8HTBQqmfcs/XN0ACIRD9PI/AAAAAAAAAlo/FLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw/s1600/f_logo_RGB-Blue_1024.png"
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
                <div className="navbarIconItem hove1">
                    <Link to={"/home"} className="fa-solid fa-house"></Link>
                </div>
                <div className="navbarIconItem hove1">
                    <Link to={"/addFriend"} className="fa-solid fa-users"></Link>
                </div>
                <div className="navbarIconItem hove1">
                    <Link style={{paddingLeft: 40}} className="fa-brands fa-youtube"></Link>
                </div>
                <div className="navbarIconItem hove1">
                    <Link className="fa-solid fa-house"></Link>
                </div>
            </div>
            <div className="navbarRight">
                <Link style={{textDecoration: "none"}} to="/profile" className="profile_link">
                    <img src={imgAvt} alt="" className="navbarImg"/>
                </Link>

                <div style={{paddingRight: 20}}>
                    <Link type="button" class="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false"><ChatIcon/>
                    </Link>
                </div>

                <div style={{paddingRight: 20}} className="dropdown">
                    <Link type="button" class="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false"><NotificationsActiveIcon onClick={() => {
                        setNoticeCome(false)
                    }}/>
                        {noticeCome ? (<div className="right_notification">1</div>) : (<></>)}
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        {notifications?.map(item => {
                            if (accountId === item.accountReceiver) {
                                return (<Link>{item.time} | {item.content}</Link>)
                            }
                        })}
                    </div>
                </div>

                <div className="dropdown">
                    <Link type="button" class="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false"><SettingsIcon/>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        <Link className="dropdown-item" href="#">Setting</Link>
                        <Link className="dropdown-item" to="/login" onClick={() => {
                            handleLogout(accountId)
                        }}>Logout</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
