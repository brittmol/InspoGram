import React from "react";
import { Link } from "react-router-dom";
import "./DisplayComment.css"


function DisplayComment(comments) {
    return (
        <div className="single-comment">
            {/* {console.log(comments.comments[comments.comments.length - 1])} */}

            {comments.comments.length > 1 ?
                <>
                    <Link className="all-comments" to="#">View all {comments.comments.length} comments</Link>
                    <div className="user-comments">
                        <Link to={`/api/users/${comments.comments[comments.comments.length - 1]?.user.id}`}>
                            {comments.comments[comments.comments.length - 1]?.user.username}
                        </Link>
                            <div className="caption">{comments.comments[comments.comments.length - 1].comment}</div>
                    </div>
                </> :
                <div><Link to={`/api/users/${comments.comments[0]?.user.id}`}>{comments.comments[0]?.user.username}  </Link> {comments.comments[0]?.comment}</div>
            }
        </div>
    )
}


export default DisplayComment;
