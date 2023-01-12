import ShowComment from "./showComment";

const CommentDetails = ({item, postPostId}) => {
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    return (
        <div className="comments">
            {
                item.map((comment, index) => {
                    if (comment.accountId !== accountId) {
                        return (
                            <div key={index}>
                                <ShowComment comment={comment} postPostId={postPostId} isDelete={false}/>
                            </div>

                        )
                    } else {
                        return (
                            <div key={index}>
                                <ShowComment comment={comment} postPostId={postPostId} isDelete={true}/>
                            </div>
                        )
                    }
                })
            }

        </div>
    )
}
export default CommentDetails