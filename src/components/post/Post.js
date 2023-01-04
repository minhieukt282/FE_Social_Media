import React, {useEffect, useState} from "react";
import "./post.css";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import PostDetails from "./postDetails";

const Post = ({socket}) => {
    const dispatch = useDispatch();
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    const posts = useSelector(state => {
        return state.posts.posts
    })

    return (
        <div className="post">
            {
                posts && posts?.map((item, index) => {
                    if ((item?.accountId === accountId && item?.status === "private") || item?.status === "public") {
                        return (
                            <PostDetails key={index} socket={socket} item={item}  index={index}/>
                        )
                    }
                })
            }
        </div>
    );
};

export default Post;
