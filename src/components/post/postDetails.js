import {Link} from "react-router-dom";
import {Button, IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import "./post.css";
import {createLikes, deleteLikes, getLike} from "../../services/likeService";
import {createNotification, deleteNotification} from "../../services/notificationService";
import {useDispatch, useSelector} from "react-redux";

const PostDetails = ({socket, item, countLike, isSetting}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(true)
    const accountId = JSON.parse(localStorage.getItem("accountId"))

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
        console.log(dataNotice, "delete notice")
        const dataLike = {
            accountId: accountId,
            postId: postId
        }
        dispatch(deleteLikes(dataLike))
        if (accountSent !== accountReceiver) {
            await dispatch(deleteNotification(dataNotice))
        }
    }

    const handleNotificationComment = async (accountReceiver, postId) => {
        //the comment table in the database has not been saved
        const accountSent = accountId
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotice = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postId: postId,
            type: "commented"
        }

        if (accountSent !== accountReceiver) {
            await dispatch(createNotification(dataNotice))
            socket.emit("commented", dataNotice)
        }
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

    return (
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link>
                        <img
                            src={item?.imgAvt}
                            alt="my avatar"
                            className="postProfileImg"/>
                    </Link>
                    <Link to={`/profile/${item?.accountId}`} className="postUsername">{item?.displayName}</Link>
                    <span
                        className="postDate">{new Date(item?.timePost).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</span>
                    <span className="postDate">{item?.status}</span>
                </div>
                <div className="postTopRight">
                    {
                        isSetting ? (<div style={{paddingRight: 20}} className="dropdown">
                            <div type="button" data-toggle="dropdown"
                                 data-display="static" aria-expanded="false">
                                <IconButton>
                                    <MoreVert className="postVertButton"/>
                                </IconButton>
                            </div>
                            <div className="dropdown-menu dropdown-menu-lg-right">
                                <Button className="dropdown-item">Edit status</Button>
                                <Button className="dropdown-item">Delete status</Button>
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
            <div className="postBottomFooter">
                <div className="postBottomFooterItem">
                    <div>
                        {isLike ? (
                            <button onClick={() => {
                                handleNotificationLiked(item?.accountId, item?.postId)
                            }}>Like
                                {/*<i className="fa-solid fa-thumbs-up" >Like</i>*/}
                            </button>
                        ) : (
                            <button onClick={() => {
                                handleNotificationDisliked(item?.accountId, item?.postId)
                            }}>Dislike
                                {/*<i className="fa-regular fa-thumbs-up">Dislike</i>*/}
                            </button>
                        )}
                    </div>
                </div>
                <div className="postBottomFooterItem">
                    <Link className="fa-solid fa-comment-dots"></Link>
                    <span> Comment</span>
                </div>
                <div className="postBottomFooterItem">
                    <Link className="fa-solid fa-share"></Link>
                    <span> share</span>
                </div>
            </div>
        </div>
    )
}
export default PostDetails