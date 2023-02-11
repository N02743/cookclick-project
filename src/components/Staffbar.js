import {
  FaHome,
  FaCheck,
  FaSearch,
  FaBan,
  FaUserCircle,
  FaUser,
  FaPlus,
} from "react-icons/fa"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Logonobg from "../img/logo2.svg"
import { useAuth } from "../script/useAuth"
import Modal from "react-bootstrap/Modal"

function Staffbar({ user, onchangelogout }) {
  const staffname = user.displayname
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
    setmodalshow(false)
    logout()
    onchangelogout(false)
  }

  return (
    <>
      <Navbar key="false" expand="false" className="mb-3 color-staffnav">
        <Container fluid>
          <Navbar.Toggle onClick={handleShow} />
          <Navbar.Brand href="/staff/dashboard">
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
            <Offcanvas.Header className="staffbar-bluebg" closeButton>
              <img src={Logonobg} alt="logo" style={{ width: "150px" }}></img>
            </Offcanvas.Header>
            <Offcanvas.Body className="staffbar-bluebg">
              <div className="staffbar-profile">
                <FaUserCircle size="183.5" />
                <div className="staffbar-text-center">
                  ยินดีต้อนรับ
                  <br />
                  {staffname}
                </div>
              </div>
              <div className="staffbar-menubar staffbar-text">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Staff/Dashboard">
                    <FaSearch />
                    &nbsp;Dashboard
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Staff/add-ingredient">
                    <FaPlus />
                    &nbsp;เพิ่มวัตถุดิบและอุปกรณ์
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Staff/Approve">
                    <FaCheck />
                    &nbsp;อนุมัติสูตรอาหาร
                  </Nav.Link>
                </Nav>
                {user.role === 3 && (
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/Staff/user">
                      <FaUser />
                      &nbsp;User ทั้งหมด
                    </Nav.Link>
                  </Nav>
                )}
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/staff/report/members">
                    <FaBan />
                    &nbsp;การรายงาน
                  </Nav.Link>
                </Nav>
              </div>
            </Offcanvas.Body>
            <Offcanvas.Header className="staffbar-footer">
              <Button className="staffbar-logout-button" onClick={onlogout}>
                Logout
              </Button>
            </Offcanvas.Header>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
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

export default Staffbar
