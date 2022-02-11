import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../../store/post";
import RenderUser from "../RenderUser";
import './LikeModal.css';

function ShowLikesModal({post}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    //const posts = useSelector(state => state.post.posts);

    //const post = posts.filter(e => e.id === id);
    useEffect(() => {
        const payload = {
            id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser])

    return (
        <>
            {post?.likes.map(user =>
                <div className="list-of-likes" key={user.id}>
                    <RenderUser prop={{"id": post.id, "user": user}}  />
                </div>
            )}
        </>
    )
}

export default ShowLikesModal;
