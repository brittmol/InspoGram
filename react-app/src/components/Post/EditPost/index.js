import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import EditPostForm from './EditPostForm';



function EditPostModal ({post, onCloseMenuModal}) {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false)
    if(onCloseMenuModal) {
      onCloseMenuModal()

    }
  }


  return (
    <>
      <button className='modal-menu-edit' id={post.id} onClick={() => setShowModal(true)}>
            Edit Caption
      </button>
      {showModal && (
        <Modal onClose={onCloseModal}>
          <EditPostForm post={post} onClose={onCloseModal}/>
        </Modal>
      )}
    </>
  );
}
export default EditPostModal ;
