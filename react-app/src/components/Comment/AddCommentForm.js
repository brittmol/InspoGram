import React, { useEffect, useState } from "react"; // useEffect,
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createComment, getAllPost } from "../../store/post";
import { createUserComment } from "../../store/userPosts";
import "./AddComment.css";

function AddCommentForm({ id, flag }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  //const [errors, setErrors] = useState([])

  useEffect(() => {
    if (comment.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    
    const payload = {
      comment,
      post_id: id,
      user_id: sessionUser?.id,
    };

    dispatch(getAllPost(payload));
  }, [disabled, comment]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      comment,
      post_id: id,
      user_id: sessionUser.id,
    };

    dispatch(createUserComment(payload));
    dispatch(getAllPost(payload));
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      comment,
      post_id: id,
      user_id: sessionUser.id,
    };

    dispatch(createComment(payload));
    dispatch(getAllPost(payload));
    setComment("");
  };

  return (
    <form
      className="comment-form"
      onSubmit={flag ? handleUserSubmit : handleSubmit}
    >
      <input
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="post-btn" disabled={disabled} type="submit">
        Post
      </button>
    </form>
  );
}

export default AddCommentForm;
