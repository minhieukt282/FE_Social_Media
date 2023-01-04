import {Link} from "react-router-dom";
import {Button, IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import "./post.css";
import {createLikes, deleteLikes, getLike} from "../../services/likeService";
import {createNotification, deleteNotification} from "../../services/notificationService";
import {useDispatch, useSelector} from "react-redux";
import {deletePosts, getPosts} from "../../services/postServices";
import Swal from 'sweetalert2';
import EditPost from "./EditPost";


const PostDetails = ({socket, item, countLike, isSetting}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(true)
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    console.log(accountId)
    useEffect(() => {
        dispatch(getLike())
    }, [like])

    const likes = useSelector(state => {
        return state.likes.likes
    })

    const handleNotificationLiked = async (accountReceiver, postId) => {
        setLike(!like)
        const accountSent = accountId
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotice = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postId: postId,
            type: "liked"
        }
        const dataLike = {
            accountId: accountId,
            postId: postId,
            displayName: displayName
        }
        await dispatch(createLikes(dataLike))
        if (accountSent !== accountReceiver) {
            await dispatch(createNotification(dataNotice))
            socket.emit("liked", dataNotice)
        }
    }

    const handleNotificationDisliked = async (accountReceiver, postId) => {
        setLike(!like)
        const accountSent = accountId
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotice = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postId: postId,
            type: "liked"
        }
        const dataLike = {
            accountId: accountId,
            postId: postId
        }
        dispatch(deleteLikes(dataLike))
        if (accountSent !== accountReceiver) {
            await dispatch(deleteNotification(dataNotice))
        }
    }


    const handleDeletePost = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deletePosts(item.postId));
            }
        })
    }
    let isLike = true
    if (likes !== undefined) {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].postId === item?.postId && likes[i].accountId === accountId) {
                isLike = false
                break
            }
        }
    }

    let icon = ''
    if (item.status === 'public') {
        icon = 'fa-earth-americas'
    } else if (item.status === 'private') {
        icon = 'fa-lock'
    } else {
        icon = 'fa-user-group'
    }

    return (
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link>
                        <img
                            src="image/avatar/images.jpg"
                            alt="my avatar"
                            className="postProfileImg"/>
                    </Link>
                    <Link to={`/${item?.accountId}`} className="postUsername">{item?.displayName}</Link>
                    <span
                        className="postDate">{new Date(item?.timePost).toLocaleString("en-GB", {timeZone: "Asia/Jakarta"})}
                    </span>
                    <i className={`fa-solid ${icon}`}></i>
                </div>
                <div className="postTopRight">
                    {
                        isSetting ? (
                            <div style={{paddingRight: 20}} className="dropdown">
                                <div type="button" data-toggle="dropdown"
                                     data-display="static" aria-expanded="false">
                                    <IconButton>
                                        <MoreVert className="postVertButton"/>
                                    </IconButton>
                                </div>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                    <Button className="dropdown-item">
                                        <EditPost></EditPost>
                                    </Button>
                                    <Button
                                        className="dropdown-item"
                                        to="/"
                                        onClick={() => {
                                            handleDeletePost()
                                        }}>Delete status</Button>
                                </div>
                            </div>) : (<></>)
                    }

                </div>
            </div>
            <div className="postCenter">
                <span>{item?.contentPost}</span>
                <img
                    src={item?.imgPost}
                    alt=""
                    className="postImg"/>
            </div>
            <div className="postBottomFooter">
                <div>
                    <i className="fa-regular fa-thumbs-up"> {countLike}</i>
                </div>
            </div>

            <hr/>
            <div className="postBottomFooter">
                <div className="postBottomFooterItem">
                    <div>
                        {isLike ? (
                            <button
                                className="button"
                                onClick={() => {
                                    handleNotificationLiked(item?.accountId, item?.postId)
                                }}><i className="fa-solid fa-thumbs-up"></i>
                                <span className="span"> Like</span>
                            </button>
                        ) : (
                            <button
                                className="button"
                                onClick={() => {
                                    handleNotificationDisliked(item?.accountId, item?.postId)
                                }}>
                                <i className="fa-solid fa-thumbs-down"></i>
                                <span className="span"> Dish like</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="postBottomFooterItem">
                    <button className="button">
                        <i className="fa-solid fa-comment-dots"></i>
                        <span className="span"> Comment</span>
                    </button>
                </div>
                <div className="postBottomFooterItem">
                    <button className="button">
                        <i className="fa-solid fa-share"></i>
                        <span className="span">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )

}
export default PostDetails