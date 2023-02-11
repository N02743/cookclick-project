import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Dropdown from "react-bootstrap/Dropdown"
import { decodeToken } from "react-jwt"
import { EditMemberRole } from "../script/controller"

const Userbox = ({ uid, username, email, role, setignore }) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const UserData = decodeToken(token)
  const [modalshow, setmodalshow] = useState(false)
  const showmodal = () => {
    setmodalshow(true)
  }
  const hidemodal = () => {
    setmodalshow(false)
  }
  const [memmodalshow, setmemmodalshow] = useState(false)
  const showmemmodal = () => {
    setmemmodalshow(true)
  }
  const hidememmodal = () => {
    setmemmodalshow(false)
  }
  const confirmsetmem = async () => {
    hidemodal()
    hidememmodal()
    await EditMemberRole(token, uid, 1)
    setignore(false)
  }

  const [modmodalshow, setmodmodalshow] = useState(false)
  const showmodmodal = () => {
    setmodmodalshow(true)
  }
  const hidemodmodal = () => {
    setmodmodalshow(false)
  }
  const confirmsetmod = async () => {
    hidemodal()
    hidemodmodal()
    await EditMemberRole(token, uid, 2)
    setignore(false)
  }

  const [adminmodalshow, setadminmodalshow] = useState(false)
  const showadminmodal = () => {
    setadminmodalshow(true)
  }
  const hideadminmodal = () => {
    setadminmodalshow(false)
  }
  const confirmsetadmin = async () => {
    hidemodal()
    hideadminmodal()
    await EditMemberRole(token, uid, 3)
    setignore(false)
  }

  return (
    <div className="userbox-box">
      <h4 className="userbox-uid">{uid}</h4>
      <h4 className="userbox-username">{username}</h4>
      <h4 className="userbox-email">{email}</h4>
      {UserData.role >= role && (
        <>
          <button className="userbox-deluser-btn" onClick={showmodal}>
            แก้ไขข้อมูล
          </button>
          <Modal show={modalshow} onHide={hidemodal}>
            <Modal.Header closeButton>
              แก้ไขข้อมูลผู้ใช้ {username}
            </Modal.Header>
            <Modal.Body>
              <Dropdown>
                <Dropdown.Toggle>เปลี่ยนแปลงประเภทบัญชีผู้ใช้</Dropdown.Toggle>
                <Dropdown.Menu>
                  {role !== 1 && (
                    <Dropdown.Item onClick={showmemmodal}>Member</Dropdown.Item>
                  )}
                  {role !== 2 && (
                    <Dropdown.Item onClick={showmodmodal}>
                      Moderator
                    </Dropdown.Item>
                  )}
                  {role !== 3 && (
                    <Dropdown.Item onClick={showadminmodal}>
                      Admin
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Modal.Body>
          </Modal>
          <Modal show={memmodalshow} onHide={hidememmodal}>
            <Modal.Header closeButton>
              ยืนยันการเปลี่ยน {username} เป็น Member
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={hidememmodal}>ยกเลิกการเปลี่ยนแปลง</Button>
              <Button onClick={confirmsetmem}>ยืนยันการเปลี่ยนแปลง</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modmodalshow} onHide={hidemodmodal}>
            <Modal.Header closeButton>
              ยืนยันการเปลี่ยน {username} เป็น Moderator
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={hidemodmodal}>ยกเลิกการเปลี่ยนแปลง</Button>
              <Button onClick={confirmsetmod}>ยืนยันการเปลี่ยนแปลง</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={adminmodalshow} onHide={hideadminmodal}>
            <Modal.Header closeButton>
              ยืนยันการเปลี่ยน {username} เป็น admin
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={hideadminmodal}>ยกเลิกการเปลี่ยนแปลง</Button>
              <Button onClick={confirmsetadmin}>ยืนยันการเปลี่ยนแปลง</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  )
}
export default Userbox
