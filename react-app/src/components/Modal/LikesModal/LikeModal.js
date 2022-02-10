import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../../store/post";
import RenderLikedUser from "./RenderLikedUser";
import './LikeModal.css';

function ShowPostLikesModal(id) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);

    const post = posts.filter(e => e.id === id.id);

    useEffect(() => {
        const payload = {
            id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser])

    return (
        <>
            {post[0]?.likes.map(user =>
                <div className="list-of-likes" key={user.id}>
                    <RenderLikedUser prop={{"id": id, "user": user}}  />
                </div>
            )}
        </>
    )
}

export default ShowPostLikesModal;
