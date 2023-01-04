import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./post.css";
import {createLikes, deleteLikes, getLike} from "../../services/likeService";
import {createNotification, deleteNotification} from "../../services/notificationService";
import {useDispatch, useSelector} from "react-redux";

const PostDetails = ({socket, item, index}) => {
    console.log(item)
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
                            src="image/avatar/images.jpg"
                            alt="my avatar"
                            className="postProfileImg"/>
                    </Link>
                    <span className="postUsername">{item?.displayName}</span>
                    <span
                        className="postDate">{new Date(item?.timePost).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}
                    </span>
                    <i className="fa-solid fa-earth-americas"></i>

                    {/*<i className="fa-solid fa-user-group"></i> //icon only friends*/}
                    {/*<i className="fa-solid fa-earth-americas"></i>//icon public*/}
                </div>
                {/*<div className="postTopRight">*/}
                {/*    <span className="postDate">{item?.status}</span>*/}
                {/*    /!*<IconButton>*!/*/}
                {/*    /!*    <MoreVert className="postVertButton"/>*!/*/}
                {/*    /!*</IconButton>*!/*/}
                {/*</div>*/}
            </div>
            <div className="postCenter">
                <span>{item?.contentPost}</span>
                <img
                    src={item?.imgPost}
                    alt=""
                    className="postImg"/>
            </div>
            {/*<hr style={{border: "0.5px solid"}}/>*/}
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