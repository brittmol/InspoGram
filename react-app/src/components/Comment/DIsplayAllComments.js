import CommentModal from ".";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DisplayAllComments(comments) {

    console.log(comments, '____________-----------------')
    const posts = useSelector(state => state.userPostsReducer)



    return (
        <>
            {comments.comments.map(comment => (
                <div key={comment.id}>{comment.comment}
                    <CommentModal comment={comment} />
                </div>

            ))}
        </>
    )
}

export default DisplayAllComments;
