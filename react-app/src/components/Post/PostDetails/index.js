import React, { useState } from 'react';
import { ProfileModal } from '../../../context/Modal';
// import CreatePostForm from './CreatePostForm';
import PostDetails from './PostDetailsInModal';




function PostDetailsModal({post}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
  }




  return (
    <div className='profile-post-container'>
      <div className="post-icon-container">
        <i className="fas fa-heart hover-icon"><span>{post?.comments?.length}</span></i>
        <i className="fas fa-comment hover-icon"><span>{post?.likes?.length}</span></i>
      </div>
      <img className='profile-post-img' src={post?.photos[0]?.photo} onClick={() => setShowModal(true)} alt='user-pic'></img>
      {showModal && (
        <ProfileModal onClose={() => setShowModal(false)}>
          <PostDetails post={post} onClose={onCloseModal}/>
        </ProfileModal>
      )}
    </div>
  );
}
export default PostDetailsModal;