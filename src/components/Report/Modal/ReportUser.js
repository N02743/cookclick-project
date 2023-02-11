import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteUserModal from './DeleteUser';
import RejectReportModal from './RejectReport';

function ReportUserModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo Report User Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>REPORTED USER DESCIPTION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>REPORTED BY</h4>
            Mr. Yakkinkao
            <br/><br/>
            <h4>DESCRIPTION</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin vitae massa sit amet elementum. 
        </Modal.Body>
        <Modal.Footer>
          <DeleteUserModal/>
          <RejectReportModal/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReportUserModal;