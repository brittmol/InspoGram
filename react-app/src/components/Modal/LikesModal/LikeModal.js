import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../../store/post";



function ShowPostLikesModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);
    const likes = useSelector(state => state.post.likes);

    useEffect(() => {
        const payload = {
            id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
        dispatch(getLikesByUser(payload))
    }, [dispatch, sessionUser])

    

    return(
       <div className="list-of-likes">

       </div>
    )
}

export default ShowPostLikesModal;
