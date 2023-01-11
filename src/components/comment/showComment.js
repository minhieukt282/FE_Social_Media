import {Link} from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {deleteComments} from "../../services/commentService";
import "./comment.css"
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";

const ShowComment = ({comment ,postPostId}) => {
    console.log(comment)
    const dispatch = useDispatch();

    const handleDeleteComment = () => {
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
                const dataDelete = {
                    comment: comment.accountId,
                    displayName: comment.displayName,
                    img: comment.img,
                    postPostId: postPostId,
                    accountId:comment.accountId,
                    commentId: comment.commentId
                }
                await dispatch(deleteComments(dataDelete))
            }
        })
    }

    return (
        <div className="commentWrapper">
            <div className="commentTop">
                <div className="commentTopLeft">
                    <Link>
                        <img
                            src={comment.img}
                            alt="my avatar"
                            className="commentProfileImg"/>
                    </Link>
                    <Link to={`/profile/${comment.accountId}`}
                          className="commentUsername">{comment.displayName}</Link>
                    <span
                        className="commentDate">{new Date(comment.timeUpdate).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}
                    </span>

                </div>
                <div className="commentTopRight">
                            <div style={{paddingRight: 20}} className="dropdown">
                                <div type="button" data-toggle="dropdown"
                                     data-display="static" aria-expanded="false">
                                    <IconButton>
                                        <MoreVert className="postVertButton"/>
                                    </IconButton>
                                </div>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            handleDeleteComment()
                                        }}
                                    >
                                        Delete comment
                                    </button>
                                </div>
                            </div>
                </div>
            </div>
            <div className="postCenter">
                <span>{comment.comment}</span>
            </div>
            <div className="postBottomFooter"></div>
        </div>
    )
}
export default ShowComment