import React, {useEffect, useState} from "react";
import "./post.css";
import {IconButton} from "@mui/material";
import {Favorite, MoreVert, ThumbUp} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";
import PostDetails from "./postDetails";
import AddPost from "./AddPost";

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
        // <>
        //     <div className="post">
        //         {
        //             posts.data && posts.data?.map((item) => (
        //
        //                 <div className="postWrapper">
        //                     <div className="postTop">
        //                         <div className="postTopLeft">
        //                             <Link>
        //                                 <img
        //                                     src="image/avatar/images.jpg"
        //                                     alt="my avatar"
        //                                     className="postProfileImg"/>
        //                             </Link>
        //                             <div>
        //                                 <span className="postUsername">{item?.nameAccount}</span>
        //                             </div>
        //                             <div>
        //                                 <span
        //                                     className="postDate">{new Date(item?.timePost).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</span>
        //                             </div>
        //
        //                         </div>
        //                         <div className="postTopRight">
        //                             <IconButton>
        //                                 <MoreVert className="postVertButton"/>
        //                             </IconButton>
        //                         </div>
        //                     </div>
        //                     <div className="postCenter">
        //                         <span>{item?.contentPost}</span>
        //                         <img
        //                             src={item?.imgPost}
        //                             alt=""
        //                             className="postImg"/>
        //                     </div>
        //                     {/*                    <div className="postBottom">*/}
        //                     {/*                        <div className="postBottomLeft">*/}
        //                     {/*                            <Favorite className="bottomLeftIcon" style={{color: "red"}}/>*/}
        //                     {/*                            <ThumbUp className="bottomLeftIcon" style={{color: "#011631"}}/>*/}
        //                     {/*                            <span className="postLikeCounter"></span>*/}
        //                     {/*                        </div>*/}
        //                     {/*                        <div className="postBottomRight">*/}
        //                     {/*<span className="postCommentText">comment*/}
        //                     {/*    /!*{post.comment} · comments · share*!/*/}
        //                     {/*</span>*/}
        //                     {/*                        </div>*/}
        //                     {/*                    </div>*/}
        //                     <hr style={{border: "0.5px solid"}}/>
        //                     <div className="postBottomFooter">
        //                         <div className="postBottomFooterItem">
        //                             <Link className="fa-solid fa-thumbs-up"></Link>
        //                             <span>like</span>
        //                         </div>
        //                         <div className="postBottomFooterItem">
        //                             <Link className="fa-solid fa-comment-dots"></Link>
        //                             <span>cmt</span>
        //                         </div>
        //                         <div className="postBottomFooterItem">
        //                             <Link className="fa-solid fa-share"></Link>
        //                             <span>share</span>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))
        //         }
        //     </div>
        // </>
    );
};


export default Post;
