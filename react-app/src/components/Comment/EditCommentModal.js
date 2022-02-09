import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCommentForm from './EditCommentForm';




function EditCommentModal ({comment, onCloseMenuModal}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
    if(onCloseMenuModal) {
      onCloseMenuModal()

    }
  }
  

  return (
    <>
      <button className='modal-menu-edit' id={comment.id} onClick={() => setShowModal(true)}>
            Edit Comment
      </button>
      {showModal && (
        <Modal onClose={onCloseModal}>
          <EditCommentForm pastComment={comment} onClose={onCloseModal}/>
        </Modal>
      )}
    </>
  );
}
export default EditCommentModal ;
