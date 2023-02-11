import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteCommentModal from './DeleteComment';
import RejectReportModal from './RejectReport';

function ReportCommentModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo Report Comment Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>REPORTED COMMENT DESCIPTION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>REPORTED BY</h4>
            Mr. Yakkinkao
            <br/><br/>
            <h4>COMMENT</h4>
            comment...
            <br/><br/>
            <h4>DESCRIPTION</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin vitae massa sit amet elementum. 
        </Modal.Body>
        <Modal.Footer>
          <DeleteCommentModal/>
          <RejectReportModal/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportCommentModal;