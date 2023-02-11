import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCommentModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="reportModal-primary" onClick={handleShow}>
        DELETE USER
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE COMMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="reportModal-primary" onClick={handleClose}>
            DELETE
          </Button>
          <Button variant="secondary" className="reportModal-secondary" onClick={handleClose}>
            CANCLE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCommentModal;