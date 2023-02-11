import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteMenuModal from './DeleteMenu';
import RejectReportModal from './RejectReport';

function ReportMenuModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo Report Menu Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>REPORTED MENU DESCIPTION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>REPORTED BY</h4>
            Mr. Yakkinkao
            <br/><br/>
            <h4>DESCRIPTION</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin vitae massa sit amet elementum. 
        </Modal.Body>
        <Modal.Footer>
          <DeleteMenuModal/>
          <RejectReportModal/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportMenuModal;