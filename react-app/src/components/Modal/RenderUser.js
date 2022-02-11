import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { followAUser, getAllPost, getLikesByUser, unfollowAUser } from "../../store/post";
import cat from '../../images/cat.jpg';

function RenderUser(prop) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);

    const post = posts.filter(e => e.id === prop.id);
    const followingList = sessionUser?.following.map(user => user.id);

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const payload = {
            user_id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
        dispatch(getLikesByUser(payload));
    }, [dispatch, sessionUser])

    useEffect(() => {
        setIsFollowing(followingList?.includes(prop.prop.user.user_id))
    }, [])

    const followUser = (id) => {
        followingList.push(id)
        setIsFollowing(true)
        return dispatch(followAUser(id))
    }

    const unfollowUser = (id) => {
        const index = followingList.indexOf(id)
        followingList.splice(index, 1)
        setIsFollowing(false)
        return dispatch(unfollowAUser(id))
    }

    return (
        <>
            <div className="user-prof-pic">
                <img className='post-profile-pic' src={cat} alt='cat' />
                <div className="user-info">
                    <Link to={`/users/${prop.prop.user.user_id}`}>{prop.prop.user.user.username}</Link>
                    <p>{prop.prop.user.user.full_name}</p>
                </div>
            </div>
            {sessionUser.id === prop.prop.user.user_id ?
                <button className="me-btn" disabled={true}>me</button> :
                (isFollowing ?
                    <button className="following-btn" onClick={() => unfollowUser(prop.prop.user.user_id)}>Following</button> :
                    <button className="follow-btn" onClick={() => followUser(prop.prop.user.user_id)}>Follow</button>
                )
            }
        </>
    )
}

export default RenderUser;
