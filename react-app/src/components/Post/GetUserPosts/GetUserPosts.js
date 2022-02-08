import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../store/userPosts";

import './GetUserPosts.css'


function GetUserPosts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserPosts(user.id))
    }, [])

    const posts = useSelector(state => state.userPostsReducer)

    const postsList = Object.values(posts)

    return (
        <>
        <h1>uuser posts doijaoidjaso</h1>
        <ul>
            {postsList?.map(post => (
                <div>
                <li key={post?.id}>{post?.photos[0]?.photo}</li>
                <li key={post?.id}>{post?.comments[0]?.comment}</li>
                </div>
            ))}
        </ul>
        </>
    )
}

export default GetUserPosts;
