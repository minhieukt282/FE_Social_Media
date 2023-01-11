import {Link} from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {deleteComments} from "../../services/commentService";
import "./comment.css"
import {IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {getPosts} from "../../services/postServices";

const ShowComment = ({comment, postPostId, isDelete}) => {
    const dispatch = useDispatch();

    const handleDeleteComment = () => {
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
                    comment: comment.accountId,
                    displayName: comment.displayName,
                    img: comment.img,
                    postPostId: postPostId,
                    accountId: comment.accountId,
                    commentId: comment.commentId
                }
                await dispatch(deleteComments(dataDelete))
                await dispatch(getPosts())
            }
        })
    }
    return (
        <div className="commentWrapper">
            <div className="commentTop">
                <div className="commentAvt col-1">
                    <Link to={`/profile/${comment.accountId}`}>
                        <img
                            src={comment.img}
                            alt="my avatar"
                            className="commentProfileImg"/>
                    </Link>
                </div>
                <div className="userComment col-11">
                    <div className={"commentCenter row"}>
                        <div className="col-10 comment">
                            <div className={"body-user-comment-body"}>
                                <Link to={`/profile/${comment.accountId}`}
                                      className="commentUsername">{`${comment.displayName} `}
                                </Link>
                                <span className="commentDate">
                                    {new Date(comment.timeUpdate).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}
                                </span>
                                <div className="commentCenter">
                                    <span>{comment.comment}</span>
                                </div>
                            </div>
                        </div>
                        <div className={"col-1 comment"}>
                            <div className="commentWrapper-right">
                            {
                                isDelete ? (<div className="commentTopRight">
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
                                </div>) : (<></>)
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowComment