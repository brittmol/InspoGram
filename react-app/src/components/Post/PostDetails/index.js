import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import CreatePostForm from './CreatePostForm';
import PostDetails from './PostDetails';




function PostDetailsModal({photo, postId}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
  }




  return (
    <>
      <button id={postId} onClick={() => setShowModal(true)}>
            {photo}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostDetails postId={postId} onClose={onCloseModal}/>
        </Modal>
      )}
    </>
  );
}
export default PostDetailsModal;
