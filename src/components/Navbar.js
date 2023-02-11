import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import {
  FaHome,
  FaSearch,
  FaSearchPlus,
  FaPlus,
  FaDrumstickBite,
  FaUserCircle,
} from "react-icons/fa"
import { TiHeartFullOutline } from "react-icons/ti"
import { BsList } from "react-icons/bs"
import React, { useState } from "react"
import Logonobg from "../img/logo2.svg"
import Button from "react-bootstrap/Button"
import { useAuth } from "../script/useAuth"
import Modal from "react-bootstrap/Modal"

function Nbar({ user, onchangelogout }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { logout } = useAuth()
  const onlogout = () => {
    setmodalshow(true)
  }
  const [modalshow, setmodalshow] = useState(false)
  const handlemodalClose = () => setmodalshow(false)
  const handleConfirmlogout = () => {
    localStorage.removeItem("userId")
    setmodalshow(false)
    logout()
    onchangelogout(false)
  }

  return (
    <>
      <div>
        <Navbar key="false" expand="false" className="color-nav mb-3" id="mynavbar">
          <Container fluid>
            <Navbar.Toggle onClick={handleShow} />
            <Navbar.Brand href="/">
              <img src={Logonobg} alt="logo" style={{ width: "150px" }}></img>
            </Navbar.Brand>
            <Navbar.Brand href="/">
              <FaHome />
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-fasle`}
              show={show}
              onHide={handleClose}
            >
              <Offcanvas.Header className="offcanvas-violet" closeButton>
                <img src={Logonobg} alt="logo" width="150px"></img>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-violet" placement="start">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Search">
                    <FaSearch />
                    &nbsp;ค้นหาสูตรอาหารทั้งหมด
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/SearchRef">
                    <FaSearchPlus />
                    &nbsp;ค้นหาสูตรอาหารจากวัตถุดิบในตู้เย็น
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Add">
                    <FaPlus />
                    &nbsp;เพิ่มสูตรอาหาร
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Ref">
                    <FaDrumstickBite />
                    &nbsp;จัดการวัตถุดิบ
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Mymenu">
                    <BsList />
                    &nbsp;สูตรอาหารของฉัน
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Myfav">
                    <TiHeartFullOutline />
                    &nbsp;สูตรอาหารที่ฉันชื่นชอบ
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
              <Offcanvas.Header className="offcanvas-foot flex">
                <div className="flex space-around">
                  <FaUserCircle size={50} />
                  <div className="profilename">
                    <span>เข้าสู่ระบบด้วย</span>
                    <br />
                    <span>{user.displayname}</span>
                    <br />
                  </div>
                </div>
                <Button onClick={onlogout}>ออกจากระบบ</Button>
              </Offcanvas.Header>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      <Modal show={modalshow} onHide={handlemodalClose}>
        <Modal.Header closeButton>
          <Modal.Title>กรุณายืนยันการออกจากระบบ</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlemodalClose}>
            ยกเลิกการออกจากระบบ
          </Button>
          <Button variant="primary" onClick={handleConfirmlogout}>
            ยืนยันการออกจากระบบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Nbar
