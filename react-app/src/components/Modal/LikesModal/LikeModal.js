import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import cat from '../../../images/cat.jpg';
import { getAllPost, getLikesByUser } from "../../../store/post";
import './LikeModal.css';

function ShowPostLikesModal(id) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);

    const post = posts.filter(e => e.id === id.id);
    const followingList = sessionUser?.following.map( user => user.id )

    useEffect(() => {
        const payload = {
            id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser])

    const RenderBtn = (user) => {
        if (user.user.user_id === sessionUser.id) {
            return <button className="me-btn" disabled={true}>me</button>
        } else if(followingList.includes(user.user.user_id)){
            console.log(user.user_id, followingList)
            return <button className="following-btn" onClick={() => console.log('following')}>Following</button>
        } else {
            console.log(user.user_id, followingList)
            return <button className="follow-btn" onClick={() => console.log('follow')}>Follow</button>
        }
    }
    return (
        <>
            {post[0]?.likes.map( user =>
                <div className="list-of-likes" key={user.id}>
                    <div className="user-prof-pic">
                        <img className='post-profile-pic' src={cat} alt='cat' />
                        <div className="user-info">
                            <Link to={`/users/${user.user_id}`}>{user.user.username}</Link>
                            <p>{user.user.full_name}</p>
                        </div>
                    </div>
                    <RenderBtn user={user}/>
                    {/* { followingList.includes(user.user_id) ?
                    <button className="following-btn" onClick={() => console.log('following')}>Following</button>:
                    <button className="follow-btn" onClick={() => console.log('follow')}>Follow</button>
                    } */}
                </div>
            )}
        </>
    )
}

export default ShowPostLikesModal;
