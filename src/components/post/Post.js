import React, {useEffect, useState} from "react";
import "./post.css";
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import {createNotification, deleteNotification} from "../../services/notificationService";

const Post = ({socket}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(false)
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const posts = useSelector(state => {
        return state.posts.posts
    })

    const handleNotificationLiked = async (accountReceiver, postId) => {
        setLike(!like)
        const accountSent = JSON.parse(localStorage.getItem("accountId"))
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotification = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            contentId: postId,
            type: "liked"
        }
        if (accountSent !== accountReceiver) {
            await dispatch(createNotification(dataNotification))
            socket.emit("liked", dataNotification)
        }
    }

    const handleNotificationDisliked = async (accountReceiver, postId) => {
        setLike(!like)
        const accountSent = JSON.parse(localStorage.getItem("accountId"))
        const dataNotification = {
            accountSent: accountSent,
            contentId: postId,
            type: "liked"
        }
        if (accountSent !== accountReceiver) {
            await dispatch(deleteNotification(dataNotification))
            // socket.emit("liked", dataNotification)
        }
    }

    const handleNotificationComment = async (accountReceiver, postId) => {
        //the comment table in the database has not been saved
        const accountSent = JSON.parse(localStorage.getItem("accountId"))
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotification = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            contentId: postId,
            type: "commented"
        }

        if (accountSent !== accountReceiver) {
            await dispatch(createNotification(dataNotification))
            socket.emit("commented", dataNotification)
        }
    }

    return (
        <div className="post">
            {
                posts.data && posts.data?.map((item, index) => (
                    <div className="postWrapper" key={index}>
                        <div className="postTop">
                            <div className="postTopLeft">
                                <Link>
                                    <img
                                        src="https://www.bing.com/th?id=OIP.kCCJR4th0VlStPp9B-PGSwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                                        alt="my avatar"
                                        className="postProfileImg"/>
                                </Link>
                                <span className="postUsername">{item?.username}</span>
                                <span className="postDate">{item?.timePost}</span>
                            </div>
                            <div className="postTopRight">
                                <IconButton>
                                    <MoreVert className="postVertButton"/>
                                </IconButton>
                            </div>
                        </div>
                        <div className="postCenter">
                            <span>{item?.contenPost}</span>
                            <img
                                src={item?.imgPost}
                                alt=""
                                className="postImg"/>
                        </div>
                        <hr style={{border: "0.5px solid"}}/>
                        <div className="postBottomFooter">
                            <div className="postBottomFooterItem">
                                {
                                    like ? (<button>
                                        <i className="fa-solid fa-thumbs-up" onClick={() => {
                                            handleNotificationDisliked(item?.accountId, item?.postId)
                                        }}>Dislike</i>
                                    </button>) : (
                                        <button onClick={() => {
                                            handleNotificationLiked(item?.accountId, item?.postId)
                                        }}>
                                            <i className="fa-regular fa-thumbs-up">Like</i>
                                        </button>)}
                            </div>
                            <div className="postBottomFooterItem">
                                <Link className="fa-solid fa-comment-dots"></Link>
                                <span>Comment</span>
                            </div>
                            <div className="postBottomFooterItem">
                                <Link className="fa-solid fa-share"></Link>
                                <span>share</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};


export default Post;
