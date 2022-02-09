import { React, useEffect, useState } from "react"; //
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteALike, getLikesByUser, likeAPost } from '../../../store/post';

import CommentForm from '../../Comment/AddComment';
import DisplayComment from '../../Comment/DisplayComments';
import './SinglePost.css';



const SinglePost = (post) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const likes = useSelector(state => state.post.likes);
    const [like, setLike] = useState(false)

    useEffect(() => {
        const payload = {
            id: sessionUser.id
        }

        dispatch(getLikesByUser(payload))
    }, [dispatch, sessionUser, post])

    useEffect(() => {
        setLike(likes?.includes(post?.post.id))
    },[likes, post])
    
    return (
        <div className="post">
            <Link to={`/users/${post?.post.user_id}`}>
                <h2 className='post-owner'>{post?.post.users.username}</h2>
            </Link>
            <img className="photo" src={post?.post.photos[0].photo} alt="users-pic" />
            <div className='s-media-btn'>
                <div className='like-btn s-button'
                    onClick={() => {
                        like ? setLike(false) : setLike(true)
                        like ? dispatch(deleteALike({id: post?.post.id})) :
                        dispatch(likeAPost({id: post?.post.id}))
                    }}
                >
                    { like ?
                    <i className="fas fa-heart liked"></i>:
                    <i className="far fa-heart not-liked"></i>
                    }
                </div>
                <div className='comment-btn s-button'>
                    <i className="far fa-comment"></i>
                </div>
            </div>
            {post.post.likes.length > 0 ?
                <div className='post-likes'>
                    Liked by
                    <Link to="#"> {post.post.likes.length} others</Link>
                </div> :
                <></>
            }
            <div className='post-caption'>
                <Link to={`/users/${post.post.users.id}`}>{post.post.users.username}  </Link>
                <p className='caption'>{post.post.caption}</p>
            </div>
            <div className='comment-section'>
                <DisplayComment comments={post.post.comments} />
            </div>
            <CommentForm id={post.post.id} />

        </div>
    )
}

export default SinglePost
