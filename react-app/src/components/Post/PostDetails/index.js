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
    <div className='profile-post-container'>
      <div className="post-icon-container">
        <i className="fas fa-heart hover-icon"></i>
        <i class="fas fa-comment hover-icon"></i>
      </div>
      <img className='profile-post-img' src={post?.photos[0]?.photo} onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostDetails post={post} onClose={onCloseModal}/>
        </Modal>
      )}
    </div>
  );
}
export default PostDetailsModal;
