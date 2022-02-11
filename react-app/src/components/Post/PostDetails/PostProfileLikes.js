import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addUserLike, deleteUserLike } from "../../../store/userPosts";
import ShowLikesModal from "../../Modal/LikesModal/ShowLikesModal";
import { getAllPost, getLikesByUser } from '../../../store/post';
import { LikeModal } from '../../../context/Modal'

import '../../Feed/SinglePost.css'

function PostProfileLikes({ post }) {
    const dispatch = useDispatch();

    // const posts = useSelector(state => state.post.posts);
    const likes = useSelector(state => state.post.likes);
    const sessionUser = useSelector((state) => state.session.user);


    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

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
        like ? dispatch(deleteUserLike({ id: post?.id })) : dispatch(addUserLike({ id: post?.id }))
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
                            <ShowLikesModal post={post} onClose={onCloseModal} />
                        </LikeModal>
                    )}
                </div> :
                <></>
            }

        </>
    )

}

export default PostProfileLikes;
