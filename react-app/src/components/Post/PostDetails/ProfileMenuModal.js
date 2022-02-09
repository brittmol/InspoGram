import { ProfileMenuModal } from "../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from 'react';
import { deleteUserPost } from "../../../store/userPosts";
import EditPostModal from "./EditPost";



function MenuModal({post}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const onCloseMenuModal = () => {
      setShowModal(false)
    }

    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
        onCloseMenuModal()
    }

    return (
        <>
        <span onClick={() => setShowModal(true)}>. . .</span>
        {showModal && (
            <ProfileMenuModal onClose={onCloseMenuModal}>
                <EditPostModal onCloseMenuModal={onCloseMenuModal} post={post} />
                <button onClick={handleDelete} id={post.id}>Delete</button>
            </ProfileMenuModal>
        )}
        </>
    )
}

export default MenuModal;
