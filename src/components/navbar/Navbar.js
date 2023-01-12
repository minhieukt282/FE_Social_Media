import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "./navbar.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../../services/notificationService";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Field, Form, Formik} from "formik";
import {getSearch} from "../../services/searchService";
import {getRelationship} from "../../services/FriendServices";
import {toast} from "react-toastify";
import Toastify from "../toastify/toastity";

const Navbar = ({socket}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [noticeCome, setNoticeCome] = useState(false)
    const [iconNotice, setIconNotice] = useState(false)
    const accountId = JSON.parse(localStorage.getItem('accountId'))

    useEffect(() => {
        socket?.on("getNotification", data => {
            setNoticeCome(true)
            setIconNotice(!iconNotice)
        })
    }, [socket])

    useEffect(() => {
        dispatch(showNotification())
        setNoticeCome(false)
    }, [noticeCome])

    const notifications = useSelector(state => {
        return state.notification.notification
    })

    const handleLogout = (accountId) => {
        localStorage.clear()
        socket.emit("offline", {accountId: accountId})
    }

    const handleSearch = async (values) => {
        console.log()
        await dispatch(getSearch(values.searchKey))
        await dispatch(getRelationship())
        navigate('/search')
    }

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
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
                    <Formik initialValues={{
                        searchKey: ''
                    }} onSubmit={values => {
                        console.log(values)
                        handleSearch(values)
                    }}>
                        <Form>
                            <Field className="searchInput" placeholder="Search on facebook" name={'searchKey'}/>
                        </Form>
                    </Formik>
                </div>
            </div>

            <div className="navbarRight">
                <div style={{paddingRight: 20}}>
                    <Link type="button" className="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false"><ChatIcon/>
                    </Link>
                </div>

                <div style={{paddingRight: 20}} className="dropdown">
                    <Link type="button" className="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false" data-offset="10,20"><NotificationsActiveIcon
                        onClick={() => {
                            setNoticeCome(false)
                        }}/>
                        {iconNotice ? (
                            <div className="right_notification"><FiberManualRecordIcon style={{color: "red"}}/>
                            </div>) : (<></>)}
                    </Link>
                    <div id="dropdown-Notifications"
                        className="dropdown-menu dropdown-menu-lg-right px-1">
                        {notifications?.map((item, index) => {
                            if (accountId === item.accountReceiver) {
                                if (item.type === "addFriends" || item.type === "friends") {
                                    return (
                                        <>
                                            <div >
                                                <div className="dropdown-item" key={index}>
                                                    <Link
                                                        style={{color: "black", textDecoration: "none"}}
                                                        to={`/profile/${item?.accountSent}`} onClick={() => {
                                                        setIconNotice(false)
                                                    }}>{new Date(item?.time).toLocaleString("en-US",
                                                        {timeZone: "Asia/Jakarta"})} | <b>{item.displayName} </b>{item.content}
                                                        <br/></Link>
                                                </div>
                                                <div className="dropdown-divider"/>
                                            </div>
                                        </>
                                    )
                                } else if (item.type === "liked" || item.type === "comment") {
                                    return (
                                        <>
                                            <div className="dropdown-item" key={index}>
                                                <Link
                                                    style={{color: "black", textDecoration: "none"}}
                                                    to="/home" onClick={() => {
                                                    setIconNotice(false)
                                                }}>{new Date(item?.time).toLocaleString("en-US",
                                                    {timeZone: "Asia/Jakarta"})} | <b>{item.displayName} </b>{item.content}
                                                    <br/></Link>
                                            </div>
                                            <div className="dropdown-divider"/>
                                        </>
                                    )
                                } else if (item.type === "message") {
                                    return (
                                        <>
                                            <div className="dropdown-item" key={index}>
                                                <Link
                                                    style={{color: "black", textDecoration: "none"}}
                                                    to={`/message`} onClick={() => {
                                                    setIconNotice(false)
                                                }}>{new Date(item?.time).toLocaleString("en-US",
                                                    {timeZone: "Asia/Jakarta"})} | <b>{item.displayName} </b>{item.content}
                                                    <br/></Link>
                                            </div>
                                            <div className="dropdown-divider"/>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <div className="dropdown-item" key={index}>
                                                <Link
                                                    style={{color: "black", textDecoration: "none"}}
                                                    to="/home" onClick={() => {
                                                    setNoticeCome(false)
                                                }}>{new Date(item?.time).toLocaleString("en-US",
                                                    {timeZone: "Asia/Jakarta"})} | <b>{item.displayName} </b>{item.content}
                                                    <br/></Link>
                                            </div>
                                            <div className="dropdown-divider"/>
                                        </>
                                    )
                                }
                            }
                        })}
                    </div>
                </div>

                <div style={{paddingRight: 20}} className="dropdown">
                    <Link type="button" className="dropdown-toggle" data-toggle="dropdown"
                          data-display="static" aria-expanded="false"><SettingsIcon/>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        <Link className="dropdown-item" to={`/profile/${accountId}`}>My profile</Link>
                        <Link className="dropdown-item" href="#">Setting</Link>
                        <Link className="dropdown-item" to="/login" onClick={() => {
                            handleLogout(accountId)
                        }}>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
