import CommentModal from ".";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function DisplayAllComments(comments) {


    const posts = useSelector(state => state.userPostsReducer)

    const {userId} = useParams()

    // useEffect(() => {

    // }, [userId])



    return (
        <>
            {comments.comments.map(comment => (
                <div key={comment.id}>
                    <NavLink to={`/users/${comment.user.id}`}>
                        {comment.user.full_name}
                    </NavLink>{comment.comment}
                    <CommentModal comment={comment} />
                </div>

            ))}
        </>
    )
}

export default DisplayAllComments;
