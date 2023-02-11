import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteUserModal() {
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
          <Modal.Title>DELETE ACCOUNT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this account?
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

export default DeleteUserModal;