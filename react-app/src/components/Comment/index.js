// import { ProfileMenuModal } from "../../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
// import { deleteUserPost } from "../../../store/userPosts";
// import EditPostModal from "../EditPost";
import { ProfileMenuModal } from "../../context/Modal";
import EditCommentModal from "./EditCommentModal";
import { deleteUserComment } from "../../store/userPosts";
import { useParams } from "react-router-dom";

function CommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { userId } = useParams();

  const onCloseMenuModal = () => {
    setShowModal(false);
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    dispatch(deleteUserComment(id));
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
  } else {
    return null;
  }
}

export default CommentModal;
