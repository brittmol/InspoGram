import React, { useEffect } from "react"; //useState,
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserPosts } from "../../../store/userPosts";
import PostDetailsModal from "../../Post/PostDetails";
import './GetUserPosts.css'

function GetUserPosts() {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.userPostsReducer)

    const {userId} = useParams()

    useEffect(() => {
        dispatch(getUserPosts(userId))
    }, [dispatch, userId])


    const postsList = Object.values(posts)

    return (
        <section className='profile-feed-container'>
                {postsList?.map(post => (
                    <div key={post?.id}>
                        <PostDetailsModal post={post} />
                    </div>

                ))}
        </section>
    )
}

export default GetUserPosts;
