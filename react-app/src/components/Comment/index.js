import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { createComment } from '../../store/post';

function CommentForm(id){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [comment, setComment] = useState("");
    //const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            comment, 
            post_id: id.id,
            user_id: sessionUser.id
        }

        dispatch(createComment(payload));

    }

    return(
        <form className="comment-form" onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">
                Share
            </button>
        </form>
    )
}

export default CommentForm;
