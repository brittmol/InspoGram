import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../store/userPosts";
import { deleteUserPost } from "../../../store/userPosts";
import './GetUserPosts.css'
import PostDetailsModal from "../PostDetails";



function GetUserPosts() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        dispatch(getUserPosts(user.id))
    }, [])

    const posts = useSelector(state => state.userPostsReducer)

    const postsList = Object.values(posts)
    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
    }
    const onEdit = (e) => {
        const id = e.target.id
        setEdit(true)
    }

    return (
        <>

            <ul>
                {postsList?.map(post => (

                    <li key={post?.id}>
                        <PostDetailsModal post={post} />
                        {/* <button>
                            {post?.photos[0]?.photo}
                        </button> */}
                        {/* <div> */}
                            {/* {edit?<input value={post?.caption} /> : <div>{post?.caption}</div>}
                            {edit? <button>Save</button> :<button id={post.id} onClick={onEdit}>Edit</button>} */}
                        {/* </div> */}
                    {/* <button onClick={handleDelete} id={post.id}>Delete</button> */}
                    </li>

                ))}
            </ul>
        </>
    )
}

export default GetUserPosts;
