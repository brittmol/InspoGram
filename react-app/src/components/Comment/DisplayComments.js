import React from "react";
import { Link } from "react-router-dom";
import "./DisplayComment.css"


function DisplayComment(comments) {
    return (
        <div className="single-comment">
            {console.log(comments.comments[comments.comments.length - 1] )}

            {comments.comments.length > 1 ?
                <>
                    <Link to="#">View all {comments.comments.length} comments..</Link>
                    <h2><Link to={`/api/users/${comments.comments[comments.comments.length - 1]?.user.id}`}>{comments.comments[comments.comments.length - 1]?.user.username}  </Link> {comments.comments[comments.comments.length - 1].comment}</h2>
                </> :
                <h2><Link to={`/api/users/${comments.comments[0]?.user.id}`}>{comments.comments[0]?.user.username}  </Link> {comments.comments[0]?.comment}</h2>
            }
            {/* {comments.comments?.map((comment) => {
                return <h2 key={comment.id}><Link to={`/api/users/${comment.user.id}`}>{comment.user.username}</Link>: {comment.comment}</h2>
            })} */}

        </div>
    )
}


export default DisplayComment;
