import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import TextsmsIcon from '@mui/icons-material/Textsms';
import React, {useEffect, useState} from "react";
import "./post.css";
import {createLikes, deleteLikes, getLike} from "../../services/likeService";
import {createNotification, deleteNotification} from "../../services/notificationService";
import {useDispatch} from "react-redux";
import {deletePosts} from "../../services/postServices";
import Swal from 'sweetalert2';
import EditPost from "./EditPost";
import AddComment from "../comment/AddComment";
import CommentDetails from "../comment/CommentDetails";


const PostDetails = ({socket, item, countLike, isSetting, url,countComment}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [showForm1, setShowForm1] = useState(false)
    const [numberLikes, setNumberLikes] = useState(countLike)
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    useEffect(() => {
        let isLike = true
        for (let i = 0; i < item.likes.length; i++) {
            if (accountId === item.likes[i].accountId) {
                isLike = false
                break
            }
        }
        setLike(isLike)
    }, [])

    const handleNotificationLiked = async (accountReceiver, postId) => {
        setLike(!like)
        setNumberLikes(numberLikes + 1)
        const accountSent = accountId
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotice = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postPostId: postId,
            type: "liked"
        }

        const dataLike = {
            accountId: accountId,
            postPostId: postId,
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
        setNumberLikes(numberLikes - 1)
        const accountSent = accountId
        const displayName = JSON.parse(localStorage.getItem("displayName"))
        const dataNotice = {
            displayName: displayName,
            accountSent: accountSent,
            accountReceiver: accountReceiver,
            postPostId: postId,
            type: "liked"
        }
        const dataLike = {
            accountId: accountId,
            postPostId: postId
        }
        dispatch(deleteLikes(dataLike))
        if (accountSent !== accountReceiver) {
            await dispatch(deleteNotification(dataNotice))
        }
    }

    const handleDeletePost = () => {
        Swal.fire({
            title: 'Are you sure delete this comment?',
            text: "if you delete the comment you will not be able to restore it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const dataDelete = {
                    postPostId: item.postId
                }
                await dispatch(deleteLikes(dataDelete))
                await dispatch(deletePosts(item.postId));
            }
        })
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
                            src={item.account.img}
                            alt="my avatar"
                            className="postProfileImg"/>
                    </Link>
                    <Link to={`/profile/${item.account.accountId}`}
                          className="postUsername">{item.account.displayName}</Link>
                    <span
                        className="postDate">{new Date(item.timeUpdate).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}
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
                                    <button className="dropdown-item">
                                        <EditPost item={item} url={url}></EditPost>
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            handleDeletePost()
                                        }}>Delete status
                                    </button>
                                </div>
                            </div>) : (<></>)
                    }
                </div>
            </div>
            <div className="postCenter">
                <span>{item.content}</span>
                <img
                    src={item.img}
                    alt=""
                    className="postImg"/>
            </div>

            <div className="postBottomFooter">
                <div>
                    <i className="fa-regular fa-thumbs-up"> {numberLikes}</i>
                </div>
                <div>
                    <button className="button" onClick={() => {
                        setShowForm1(!showForm1)
                    }}>
                        {countComment} Comments
                    </button>
                </div>
            </div>

            <hr/>
            <div className="postBottomFooter">
                <div className="postBottomFooterItem">
                    {like ? (
                        <button style={{marginLeft: 40}}
                                className="button"
                                onClick={() => {
                                    handleNotificationLiked(item.account.accountId, item.postId)
                                }}>
                            <ThumbUpOffAltIcon/>
                            <span className="span"> Like</span>
                        </button>
                    ) : (
                        <button style={{marginLeft: 20}}
                                className="button"
                                onClick={() => {
                                    handleNotificationDisliked(item.account.accountId, item.postId)
                                }}>
                            <ThumbDownAltIcon/>
                            <span className="span"> Unlike</span>
                        </button>
                    )}
                </div>

                <div className="postBottomFooterItem">
                    <button className="button" onClick={() => {
                        setShowForm(!showForm)
                    }}>
                        <TextsmsIcon/>
                        <span className="span">Comment</span>
                    </button>
                </div>
                <div className="postBottomFooterItem">
                    <button className="button">
                        <ShareIcon/>
                        <span className="span">Share</span>
                    </button>
                </div>
            </div>
            {
                showForm ? (
                    <>
                        <hr/>
                        <div className="postBottomFooter">
                            <AddComment postPostId={item.postId} img={item.account.img} />
                        </div>
                    </>
                ) : (<></>)
            }

            {
                showForm1 ? (
                    <>
                        <hr/>
                        <div className="postBottomFooter1">
                            <CommentDetails item={item.comments} postPostId={item.postId}/>
                        </div>
                    </>
                ) : (<></>)
            }
        </div>
    )

}
export default PostDetails