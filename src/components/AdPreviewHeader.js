import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import navbarpic from "../img/navbarpic.png"
import Adpic from "../img/Adpic.jpg"
import toppagepic from "../img/toppagepic.png"
import menupic from "../img/menupic.png"

function AdPreviewHeader({ btnclassname }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Button onClick={handleShow} className={btnclassname}>
        PREVIEW
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="adpreview-box">
        <Modal.Header closeButton>
          <Modal.Title>HEADER PREVIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={navbarpic} alt="navbarpic" className="adpreview-nav"></img>
          <img src={Adpic} alt="Adpic" className="adpreview-ad"></img>
          <img
            src={toppagepic}
            alt="toppagepic"
            className="adpreview-toppic"
          ></img>
          <img src={menupic} alt="menu" className="adpreview-menupic"></img>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AdPreviewHeader
