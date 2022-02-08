import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal'
import EditPostForm from './EditPostForm';



function EditPostModal ({post}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
  }


  return (
    <>
      <button id={post.id} onClick={() => setShowModal(true)}>
            Edit Caption
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm post={post} onClose={onCloseModal}/>
        </Modal>
      )}
    </>
  );
}
export default EditPostModal ;
