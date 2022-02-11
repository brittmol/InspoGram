import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllPost } from "../../../store/post";
import RenderFollowUser from "../RenderUser/RenderFollowUser";

import '../LikesModal/LikeModal.css';

function FollowerModal({prop}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    //const posts = useSelector(state => state.post.posts);

    //const post = posts.filter(e => e.id === uid);

    useEffect(() => {
        const payload = {
            user_id: sessionUser?.id
        }
        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser])

    return (
        <>
            {prop.map(user =>
                <div className="followers-list" key={user.id}>
                    <RenderFollowUser prop={{"id": user.id, "user": user}}  />
                </div>
            )}
        </>
    )
}

export default FollowerModal;
