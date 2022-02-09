import React, { useState } from 'react'; // useEffect,
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { createComment } from '../../store/post';
import { createUserComment } from '../../store/userPosts';
import "./AddComment.css";

function CommentForm({id, flag}){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [comment, setComment] = useState("");
    const history = useHistory();
    //const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to="/" />;

    const handleUserSubmit = async (e) => {
        e.preventDefault()
        console.log(id, 'user*****************')

        const payload = {
            comment,
            post_id: id,
            user_id: sessionUser.id
        }

        setComment("");
        dispatch(createUserComment(payload))
        // history.push('/feed')
    }



        const handleSubmit = async (e) => {
            e.preventDefault()
            console.log(id, 'habdle*(************')

            const payload = {
                comment,
                post_id: id,
                user_id: sessionUser.id
            }

            setComment("");
            dispatch(createComment(payload))
            // history.push('/feed')
        }



    return(
        <form className="comment-form" onSubmit={flag ? handleUserSubmit : handleSubmit}>
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
