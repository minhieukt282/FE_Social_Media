import React from "react";
import "./post.css";
import {IconButton} from "@mui/material";
import {
    ChatBubbleOutline,
    MoreVert,
    Favorite,
    ThumbUp,
    ThumbUpAltOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Post = () => {

    return (

        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link>
                            <img
                                src="https://www.bing.com/th?id=OIP.kCCJR4th0VlStPp9B-PGSwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                                alt="my avatar"
                                className="postProfileImg"/>
                        </Link>
                        <span className="postUsername">
                            Ha Nhim
                        </span>
                        <span className="postDate">Ngày</span>
                    </div>
                    <div className="postTopRight">
                        <IconButton>
                            <MoreVert className="postVertButton"/>
                        </IconButton>
                    </div>
                </div>
                <div className="postCenter">
                    <span>nội dung</span>
                    <img
                        src="https://www.bing.com/th?id=OIP.PE61N2oEfKfqGkCXMX3HyAHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                        alt=""
                        className="postImg"/>
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
        </div>
        // </div>
        //     </div>
        // </>
    );
};


export default Post;
