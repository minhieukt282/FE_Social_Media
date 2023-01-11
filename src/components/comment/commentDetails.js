import ShowComment from "./showComment";

const CommentDetails = ({item,postPostId}) => {
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    return (
       <div className="comments">
           {
               item.map((comment)=>{
                   if (comment.accountId !== accountId){
                       return(
                           <ShowComment comment={comment} postPostId={postPostId} isDelete={false}/>
                       )
                   } else {
                       return(
                           <ShowComment comment={comment} postPostId={postPostId} isDelete={true}/>
                       )
                   }
               })
           }

       </div>
    )
}
export default CommentDetails