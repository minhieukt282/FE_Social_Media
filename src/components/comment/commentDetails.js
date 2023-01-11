import ShowComment from "./showComment";

const CommentDetails = ({item,postPostId}) => {

    return (
       <div className="comments">
           {
               item.map((comment)=>{
                   return(
                       <ShowComment comment={comment} postPostId={postPostId}/>
                   )
               })
           }

       </div>
    )
}
export default CommentDetails