import React, { useEffect } from "react"; //useState,
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../store/userPosts";
import './GetUserPosts.css'
import PostDetailsModal from "../../Post/PostDetails";
import { useParams } from "react-router-dom";

function GetUserPosts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const posts = useSelector(state => state.userPostsReducer)

    const {userId} = useParams()

    useEffect(() => {
        dispatch(getUserPosts(userId))
    }, [])


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