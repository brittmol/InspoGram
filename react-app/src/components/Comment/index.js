// import { ProfileMenuModal } from "../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from 'react';
// import { deleteUserPost } from "../../../store/userPosts";
// import EditPostModal from "../EditPost";
import { ProfileMenuModal } from "../../context/Modal";
import EditCommentModal from "./EditCommentModal";
import { deleteUserComment } from "../../store/userPosts";



function CommentModal({comment}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const onCloseMenuModal = () => {
      setShowModal(false)
    }

    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserComment(id))
        onCloseMenuModal()
    }

    return (
        <>
        {/* {user?.id === post?.users?.id && */}
        <span onClick={() => setShowModal(true)}>. . .</span>
        {/* } */}
        {showModal && (
            <ProfileMenuModal onClose={onCloseMenuModal}>
                <EditCommentModal onCloseMenuModal={onCloseMenuModal} comment={comment} />
                <button className="modal-menu-delete" onClick={handleDelete} id={comment.id}>Delete comment</button>
            </ProfileMenuModal>
        )}
        </>
    )
}

export default CommentModal;
