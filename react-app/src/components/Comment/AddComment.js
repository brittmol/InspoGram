import React, { useState } from 'react'; // useEffect, 
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createComment } from '../../store/post';
import "./AddComment.css";

function CommentForm(id){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [comment, setComment] = useState("");
    const history = useHistory();
    //const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            comment,
            post_id: id.id,
            user_id: sessionUser.id
        }

        setComment("");
        dispatch(createComment(payload))
        history.push('/feed')
    }

    return(
        <form className="comment-form" onSubmit={handleSubmit}>
            <input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">
                Post
            </button>
        </form>
    )
}

export default CommentForm;