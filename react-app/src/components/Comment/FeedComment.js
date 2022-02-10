
import React, { useState, useEffect } from 'react'; // useEffect,
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { createComment, getAllPost } from '../../store/post';
import { ProfileModal } from '../../context/Modal';
import PostDetails from '../Post/PostDetails/PostDetailsInModal';
import "./AddComment.css";

function FeedCommentForm(id) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);

    const [comment, setComment] = useState("");
    const [lastUser, setLastUser] = useState("");
    const [lastUserId, setLastUserId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [lastComment, setLastComment] = useState("");
    const [commentCount, setCommentCount] = useState(0);


    useEffect(() => {
        post[0]?.comments[post[0]?.comments.length - 1] ? setLastComment(post[0]?.comments[post[0]?.comments.length - 1].comment) : setLastComment("");
        post[0]?.comments[post[0]?.comments.length - 1] ? setLastUser(post[0]?.comments[post[0]?.comments.length - 1]?.user.username) : setLastUser("");
        post[0]?.comments[post[0]?.comments.length - 1] ? setLastUserId(post[0]?.comments[post[0]?.comments.length - 1]?.user.id) : setLastUserId(1);
        setCommentCount(post[0]?.comments.length);
    }, [])

    useEffect(() => {
        const payload = {
            id: sessionUser.id
        }
        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser]);


    const onCloseModal = () => {
        setShowModal(false)

    }

    const handleModal = () => {
        setShowModal(true)

    }

    //const [errors, setErrors] = useState([])

    if (!sessionUser) return <Redirect to="/" />;
    let post = posts.filter(e => e.id === id.id);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            comment,
            post_id: id.id,
            user_id: sessionUser.id
        }

        setLastComment(payload.comment);
        setCommentCount(commentCount + 1);
        setLastUser(sessionUser.username);
        setComment("");
        dispatch(createComment(payload))
    }

    return (
        <>
            <div className="single-comment">
                {commentCount > 1 ?
                    <>
                        <Link className="all-comments" to="#" onClick={() => handleModal()}>View all {commentCount} comments</Link>
                        {showModal && (
                            <ProfileModal onClose={onCloseModal}>
                                <PostDetails post={post[0]} onClose={onCloseModal} />
                            </ProfileModal>
                        )}
                        <div className="user-comments">
                            <Link to={`/users/${post[0]?.comments[commentCount - 2]?.user.id}`}>
                                {lastUser}
                            </Link>
                            <div className="caption">{lastComment}</div>
                        </div>
                    </> :
                    <div><Link to={`/users/${lastUserId}`}>{lastUser}  </Link> {lastComment}</div>
                }
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <input
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className='post-btn' disabled={!comment.length} type="submit">
                    Post
                </button>
            </form>
        </>
    )
}

export default FeedCommentForm;
