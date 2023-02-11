import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RejectReportModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="reportModal-secondary" onClick={handleShow}>
        REJECT REPORT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>REJECT REPORT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to reject this report?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="reportModal-primary" onClick={handleClose}>
            REJECT
          </Button>
          <Button variant="secondary" className="reportModal-secondary" onClick={handleClose}>
            CANCLE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RejectReportModal;