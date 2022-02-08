import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../store/userPosts";
import { deleteUserPost } from "../../../store/userPosts";
import './GetUserPosts.css'


function GetUserPosts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserPosts(user.id))
    }, [])

    const posts = useSelector(state => state.userPostsReducer)

    const postsList = Object.values(posts)
    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
    }
    console.log(postsList, '****postlist**********')

    return (
        <>

            <ul>
                {postsList?.map(post => (

                    <li key={post?.id}>
                        <div>
                            {post?.photos[0]?.photo}
                        </div>
                        <div>
                            {post?.caption}
                        </div>
                    <button onClick={handleDelete} id={post.id}>Delete</button>
                    </li>

                ))}
            </ul>
        </>
    )
}

export default GetUserPosts;
