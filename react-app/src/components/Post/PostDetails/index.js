import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import CreatePostForm from './CreatePostForm';
import PostDetails from './PostDetails';




function PostDetailsModal({post}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
  }




  return (
    <>
      <button id={post.id} onClick={() => setShowModal(true)}>
      {post?.photos[0]?.photo}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostDetails post={post} onClose={onCloseModal}/>
        </Modal>
      )}
    </>
  );
}
export default PostDetailsModal;
