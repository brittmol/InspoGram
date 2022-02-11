import { ProfileMenuModal } from "../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { deleteUserPost } from "../../../store/userPosts";
import EditPostModal from "../EditPost";

function MenuModal({ post }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const onCloseMenuModal = () => {
    setShowModal(false);
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    dispatch(deleteUserPost(id));
    onCloseMenuModal();
  };

  return (
    <>
      {user.id === post.users.id && (
        <span onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
      )}
      {showModal && (
        <ProfileMenuModal onClose={onCloseMenuModal}>
          <EditPostModal onCloseMenuModal={onCloseMenuModal} post={post} />
          <button
            className="modal-menu-delete-only"
            onClick={handleDelete}
            id={post.id}
          >
            Delete post
          </button>
        </ProfileMenuModal>
      )}
    </>
  );
}

export default MenuModal;
