import CommentModal from ".";
import { NavLink } from "react-router-dom";

import cat from "../../images/cat.jpg";
import "../Post/PostDetails/PostDetails.css";

function DisplayAllComments({comments}) {
  
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="singular-comment-container">
          <NavLink to={`/users/${comment?.user?.id}`} activeClassName="active">
            <img className="profile-pic-comment" src={comment?.user?.profile_image_url ? comment?.user?.profile_image_url : cat} alt="cat" />
          </NavLink>
          <NavLink
            to={`/users/${comment?.user?.id}`}
            className="comment-username"
          >
            {comment?.user?.username}
          </NavLink>
          <p className="actual-comment">{comment.comment}</p>
          <CommentModal comment={comment} />
        </div>
      ))}
    </>
  );
}

export default DisplayAllComments;
