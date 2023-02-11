import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { FaHome, FaSearch, FaPlus } from "react-icons/fa"
import React, { useState } from "react"
import Logonobg from "../img/logo2.svg"

function GNbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div>
        <Navbar key="false" expand="false" className="mb-3 color-nav">
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
                  <Nav.Link href="/Login">
                    <FaPlus />
                    &nbsp;เข้าสู่ระบบ
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default GNbar
