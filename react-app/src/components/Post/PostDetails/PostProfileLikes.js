import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteALike, getAllPost, getLikesByUser, likeAPost } from '../../../store/post';

import ShowPostLikesModal from "../../Modal/LikesModal/LikeModal";
// import FeedCommentForm from "../../Comment/FeedComment";
import { LikeModal } from '../../../context/Modal'
import cat from '../../../images/cat.jpg'
import '../../Feed/SinglePost.css'
import { addUserLike, deleteUserLike } from "../../../store/userPosts";


function PostProfileLikes({post}) {
    const dispatch = useDispatch();

    // const posts = useSelector(state => state.post.posts);
    const likes = useSelector(state => state.post.likes);
    const sessionUser = useSelector((state) => state.session.user);


    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // let post = posts.filter(e => e.id === id)



    useEffect(() => {
        const payload = {
            user_id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
        dispatch(getLikesByUser(payload))
    }, [dispatch, sessionUser])

    useEffect(() => {
        setLikeCount(post?.likes.length)
        setLike(likes?.includes(post?.id))
    }, [likes])

    const handleClick = () => {

        like ? setLike(false) : setLike(true)
        // like ? dispatch(deleteALike({ id: post?.id })) : (dispatch(likeAPost({ id: post?.id })))
        like ? dispatch(deleteUserLike({ id: post?.id })) : dispatch(addUserLike({id: post?.id}))
        like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    const handleModal = () => {
        setShowModal(true)
    }

    return (
        <>
            <div className='s-media-btn'>
                <div className='like-btn s-button'
                    onClick={() => handleClick()}
                >
                    {like ?
                        <i className="fas fa-heart liked"></i> :
                        <i className="far fa-heart not-liked"></i>
                    }
                </div>
                <div className='comment-btn s-button'>
                    <i className="far fa-comment"></i>
                </div>
            </div>
            {likeCount > 0 ?
                <div className='post-likes'>
                    Liked by
                    <Link to="#" onClick={() => handleModal()}> {likeCount} others</Link>
                    {showModal && (
                        <LikeModal onClose={onCloseModal}>
                            <ShowPostLikesModal id={post?.id} onClose={onCloseModal} />
                        </LikeModal>
                    )}
                </div> :
                <></>
            }

        </>
    )

}

export default PostProfileLikes;
