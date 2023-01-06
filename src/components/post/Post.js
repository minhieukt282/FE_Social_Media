import React, {useEffect} from "react";
import "./post.css";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import PostDetails from "./postDetails";
import {getCountLikes} from "../../services/likeService";
import {getRelationship} from "../../services/FriendServices";

const Post = ({socket, url}) => {
    const dispatch = useDispatch();
    const accountId = JSON.parse(localStorage.getItem("accountId"))

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    useEffect(() => {
        dispatch(getRelationship())
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

    const relationship = useSelector(state => {
        return state.relationship.relationship
    })

    const isRelationship = (accountRes) => {
        let flag = false
        for (let i = 0; i < relationship.length; i++) {
            if ((relationship[i].accountReq === accountId && relationship[i].accountRes === accountRes && relationship[i].isFriend === true) ||
                (relationship[i].accountReq === accountRes && relationship[i].accountRes === accountId && relationship[i].isFriend === true)) {
                flag = true
                break
            }
        }
        return flag
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
                                    <PostDetails key={index} socket={socket} item={item} url = {url}
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
                            const isFriend = isRelationship(item?.accountId)
                            if (item.accountId === url && (item.status === "public" || (item.status === "onlyFriend" && isFriend === true))) {
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
                        const isFriend = isRelationship(item?.accountId)
                        if ((item.accountId === accountId && (item.status === "private" || item.status === "onlyFriend")) || item.status === "public"
                            || (item.status === "onlyFriend" && isFriend === true)) {
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
