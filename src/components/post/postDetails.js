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
import {useDispatch, useSelector} from "react-redux";
import {deletePosts, getPosts} from "../../services/postServices";
import Swal from 'sweetalert2';
import EditPost from "./EditPost";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const PostDetails = ({socket, item, countLike, isSetting, url}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(true)
    const [numberLikes, setNumberLikes] = useState(0)
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    useEffect(() => {
        dispatch(getPosts())
    }, [like])

    const posts = useSelector(state => {
        return state.posts.posts
    })

    useEffect(() => {
        let count
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].postId === item.postId) {
                count = posts[i].likes.length
            }
        }
        setNumberLikes(count)
    }, [!like])


    useEffect(() => {
        let isLike = true
        if (item.likes.length !== 0) {
            for (let i = 0; i < item.likes.length; i++) {
                if (accountId === item.likes[i].accountId) {
                    isLike = false
                    break
                }
            }
        }
        setLike(isLike)
    }, [])


    const handleNotificationLiked = async (accountReceiver, postId) => {
        setLike(!like)
        // isLike = false
        // console.log(like)
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
        // isLike = true
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
            title: 'Are you sure delete this status?',
            text: "if you delete the status you will not be able to restore it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const dataLike = {
                    postPostId: item.postId
                }
                await dispatch(deleteLikes(dataLike))
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
                    {/*<span*/}
                    {/*    className="postDate">{timeAgo.format(Date.now() - 2*60*1000)}*/}
                    {/*</span>*/}
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
                                        to="/"
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
                    {/*<i className="fa-regular fa-thumbs-up"> {countLike}</i>*/}
                </div>
                <div>
                    4000 Comments
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
                    <button className="button">
                        <TextsmsIcon/>
                        <span className="span"> Comment</span>
                    </button>
                </div>
                <div className="postBottomFooterItem">
                    <button className="button">
                        <ShareIcon/>
                        <span className="span">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )

}
export default PostDetails