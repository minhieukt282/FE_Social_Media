import React, {useEffect, useState} from "react";
import "./post.css";
import {IconButton} from "@mui/material";
import {Favorite, MoreVert, ThumbUp} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import PostDetails from "./postDetails";
import AddPost from "./AddPost";
import {getCountLikes} from "../../services/likeService";

const Post = ({socket, url}) => {
    const dispatch = useDispatch();
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    useEffect(() => {
        dispatch(getCountLikes())
    }, [])

    const posts = useSelector(state => {
        return state.posts.posts
    })

    const countLikes = useSelector(state => {
        return state.likes.countLikes
    })

    const findCountLikes = (postId) => {
        let count = 0
        for (let i = 0; i < countLikes.length; i++) {
            if (countLikes[i].postId === postId) {
                count = countLikes[i].countLike
                break
            }
        }
        return count
    }

    if (url !== null) {
        if (url === accountId) {
            return (
                <div className="post">
                    {
                        posts.map((item, index) => {
                            if (item.accountId === url) {
                                const countLikeOfPost = findCountLikes(item.postId)
                                return (
                                    <PostDetails key={index} socket={socket} item={item}
                                                 countLike={countLikeOfPost} isSetting={true}/>
                                )
                            }
                        })
                    }
                </div>
            );
        } else {
            return (
                <div className="post">
                    {
                        posts.map((item, index) => {
                            if (item.accountId === url && item.status === "public") {
                                const countLikeOfPost = findCountLikes(item.postId)
                                return (
                                    <PostDetails key={index} socket={socket} item={item}
                                                 countLike={countLikeOfPost} isSetting={false}/>
                                )
                            }
                        })
                    }
                </div>
            );
        }
    } else {
        return (
            <div className="post">
                {
                    posts.map((item, index) => {
                        if ((item.accountId === accountId && item.status === "private") || item.status === "public") {
                            const countLikeOfPost = findCountLikes(item.postId)
                            return (
                                <PostDetails key={index} socket={socket} item={item}
                                             countLike={countLikeOfPost} isSetting={false}/>
                            )
                        }
                    })
                }
            </div>
        );
    }

};


export default Post;
