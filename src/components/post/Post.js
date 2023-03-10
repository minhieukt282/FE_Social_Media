import React, {useEffect} from "react";
import "./post.css";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import PostDetails from "./PostDetails";
import {getRelationship} from "../../services/FriendServices";
import {useParams} from "react-router-dom";

const Post = ({socket, url}) => {
    const dispatch = useDispatch();
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const {urlPostId} = useParams()

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    useEffect(() => {
        dispatch(getRelationship())
    }, [])

    const posts = useSelector(state => {
        return state.posts.posts
    })

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let flag = false
        for (let i = 0; i < relationship.length; i++) {
            if (relationship[i].isFriend === true) {
                if ((relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes) ||
                    (relationship[i].accountReq === accountRes && relationship[i].accountRes === accountId)) {
                    flag = true
                    break
                }
            }
        }
        return flag
    }
    if (urlPostId !== undefined) {
        return (
            <div className="mb-5">
                {
                    posts.map((item, index) => {
                        const isFriend = isRelationship(item?.account.accountId)
                        if (+urlPostId === +item?.postId) {
                            if ((item.account.accountId === accountId && (item.status === "private" || item.status === "onlyFriend")) || item.status === "public"
                                || (item.status === "onlyFriend" && isFriend === true)) {
                                return (
                                    <PostDetails key={index} socket={socket} item={item}
                                                 countComment={item.comments.length}
                                                 countLike={item.likes.length} isSetting={false}/>
                                )
                            }
                        }
                    })
                }
            </div>
        );
    } else {
        if (url !== null) {
            if (url === accountId) {
                return (
                    <div className="mb-5">
                        {
                            posts.map((item, index) => {
                                if (item.account.accountId === url) {
                                    return (
                                        <PostDetails key={index} socket={socket} item={item} url={url}
                                                     countComment={item.comments.length}
                                                     countLike={item.likes.length} isSetting={true}/>
                                    )
                                }
                            })
                        }
                    </div>
                );
            } else {
                return (
                    <div className="mb-5">
                        {
                            posts.map((item, index) => {
                                const isFriend = isRelationship(item?.account.accountId)
                                if (item.account.accountId === url && (item.status === "public" || (item.status === "onlyFriend" && isFriend === true))) {
                                    return (
                                        <PostDetails key={index} socket={socket} item={item}
                                                     countComment={item.comments.length}
                                                     countLike={item.likes.length} isSetting={false}/>
                                    )
                                }
                            })
                        }
                    </div>
                );
            }
        } else {
            return (
                <div className="mb-5">
                    {
                        posts.map((item, index) => {
                            const isFriend = isRelationship(item?.account.accountId)
                            if ((item.account.accountId === accountId && (item.status === "private" || item.status === "onlyFriend")) || item.status === "public"
                                || (item.status === "onlyFriend" && isFriend === true)) {
                                return (
                                    <PostDetails key={index} socket={socket} item={item}
                                                 countComment={item.comments.length}
                                                 countLike={item.likes.length} isSetting={false}/>
                                )
                            }
                        })
                    }
                </div>
            );
        }
    }
};


export default Post;
