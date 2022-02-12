import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import EditCommentModal from "./EditCommentModal";
import { getAllPost } from "../../store/post";
import { ProfileMenuModal } from "../../context/Modal";
import { deleteUserComment } from "../../store/userPosts";

function CommentModal({ comment }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect( () => {
    dispatch(getAllPost({"user_id": user.id}))
  },[dispatch])

  const onCloseMenuModal = () => {
    setShowModal(false);
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    dispatch(deleteUserComment(id));
    dispatch(getAllPost({"user_id": user.id}))
    onCloseMenuModal();
  };

  if (comment.user.id === user.id) {
    return (
      <>
        <span onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        {showModal && (
          <ProfileMenuModal onClose={onCloseMenuModal}>
            <EditCommentModal
              onCloseMenuModal={onCloseMenuModal}
              comment={comment}
            />
            <button
              className="modal-menu-delete"
              onClick={handleDelete}
              id={comment.id}
            >
              Delete comment
            </button>
          </ProfileMenuModal>
        )}
      </>
    );
  } else if (user.id === Number(userId)) {
    return (
      <>
        {/* {user?.id === post?.users?.id && */}
        <span onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-ellipsis"></i>
        </span>
        {/* } */}
        {showModal && (
          <ProfileMenuModal onClose={onCloseMenuModal}>
            <button
              className="modal-menu-delete-only"
              onClick={handleDelete}
              id={comment.id}
            >
              Delete comment
            </button>
          </ProfileMenuModal>
        )}
      </>
    );
  } else {
    return null;
  }
}

export default CommentModal;
