import React, {useEffect} from "react";
import "./post.css";
import {IconButton} from "@mui/material";
import {Favorite, MoreVert, ThumbUp} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../services/postServices";


const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => {
        return state.posts.posts;
    });
    useEffect(() => {
        dispatch(getPosts());
    }, [posts]);
    return (
        <>
                <div className="post">
                    {
                        posts.data && posts.data?.map((item) => (

                            <div className="postWrapper">
                                <div className="postTop">
                                    <div className="postTopLeft">
                                        <Link>
                                            <img
                                                src={item?.imgAvt}
                                                alt="my avatar"
                                                className="postProfileImg"/>
                                        </Link>
                                        <div>
                                            <span className="postUsername">{item?.nameAccount}</span>
                                        </div>
                                        <div>
                                            <span className="postDate">{item?.timePost}</span>
                                        </div>

                                    </div>
                                    <div className="postTopRight">
                                        <IconButton>
                                            <MoreVert className="postVertButton"/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="postCenter">
                                    <span>{item?.contentPost}</span>
                                    <img
                                        src={item?.imgPost}
                                        alt=""
                                        className="postImg"/>
                                </div>
                                <div className="postBottom">
                                    <div className="postBottomLeft">
                                        <Favorite className="bottomLeftIcon" style={{color: "red"}}/>
                                        <ThumbUp className="bottomLeftIcon" style={{color: "#011631"}}/>
                                        <span className="postLikeCounter"></span>
                                    </div>
                                    <div className="postBottomRight">
            <span className="postCommentText">comment
                {/*{post.comment} · comments · share*/}
            </span>
                                    </div>
                                </div>
                                <hr style={{border: "0.5px solid"}}/>
                                <div className="postBottomFooter">
                                    <div className="postBottomFooterItem">
                                        <Link className="fa-solid fa-thumbs-up"></Link>
                                        <span>like</span>
                                    </div>
                                    <div className="postBottomFooterItem">
                                        <Link className="fa-solid fa-comment-dots"></Link>
                                        <span>cmt</span>
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
        </>
    );
};


export default Post;