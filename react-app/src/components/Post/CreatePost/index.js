import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreatePostForm from "./CreatePostForm";

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <i
        className="fa-regular fa-square-plus"
        onClick={() => setShowModal(true)}
      ></i>
      {/* <button onClick={() => setShowModal(true)}> */}
      {/* Create post */}
      {/* </button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm onClose={onCloseModal} />
        </Modal>
      )}
    </>
  );
}
export default CreatePostModal;
