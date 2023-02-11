import Approvalbox from "../../components/Approvalbox"
import React, { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import FormControl from "react-bootstrap/FormControl"
import { MenuApproveOrUnapprove, MenuRequest } from "../../script/controller.js"

const Approve = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const [Exapproval, setExapproval] = useState([])
  const [ignore, setignore] = useState(false)
  const [desc, setdesc] = useState("")
  useEffect(() => {
    async function fetchdata() {
      const response = await MenuRequest(token, "waitapprove")
      setExapproval(response.menu)
      setleft(response.menu)
    }
    if (!ignore) {
      fetchdata()
    }
    return () => {
      setignore(true)
    }
  })

  const [checklist, setchecklist] = useState([])
  const [text, settext] = useState("")
  const [left, setleft] = useState([])
  const [show, setshow] = useState(false)
  const handlerejcheck = () => {
    setdesc("")
    settext("ไม่")
    setshow(true)
  }
  const handleappcheck = () => {
    setdesc("")
    settext("")
    setshow(true)
  }
  const onconfirm = () => {
    setshow(false)
    if (text) {
      checklist.forEach((element) => {
        MenuApproveOrUnapprove(token, element._id, "unapprove", {
          description: desc,
        })
      })
    } else {
      checklist.forEach((element) => {
        MenuApproveOrUnapprove(token, element._id, "approve")
      })
    }
    setchecklist([])
    setExapproval(left)
  }
  const handleClick = (approval) => {
    if (!checklist.includes(approval)) {
      setchecklist([...checklist, approval])
      const i = left.indexOf(approval)
      setleft(left.slice(0, i).concat(left.slice(i + 1)))
    } else {
      let newleft = []
      for (let j = 0; j < Exapproval.length; j++) {
        if (!checklist.includes(Exapproval[j]) || Exapproval[j] === approval) {
          newleft.push(Exapproval[j])
        }
      }
      setleft(newleft)
      const i = checklist.indexOf(approval)
      setchecklist(checklist.slice(0, i).concat(checklist.slice(i + 1)))
    }
  }
  const [oneshow, setoneshow] = useState(false)
  const [target, settarget] = useState()
  const [action, setaction] = useState(0)
  const ononeconfirm = () => {
    setoneshow(false)
    if (checklist.includes(target)) {
      const i = checklist.indexOf(target)
      setchecklist(checklist.slice(0, i).concat(checklist.slice(i + 1)))
    } else {
      const i = left.indexOf(target)
      setleft(left.slice(0, i).concat(left.slice(i + 1)))
    }
    const i = Exapproval.indexOf(target)
    setExapproval(Exapproval.slice(0, i).concat(Exapproval.slice(i + 1)))
    if (action) {
      MenuApproveOrUnapprove(token, target._id, "approve")
    } else {
      MenuApproveOrUnapprove(token, target._id, "unapprove", {
        description: desc,
      })
    }
  }

  return (
    <>
      <div className="approve-top">
        <h1 className="approve-title-txt">สูตรอาหารที่รอการอนุมัติ</h1>
        <button className="approve-rejsel-btn" onClick={handlerejcheck}>
          REJECT SELECTED
        </button>
        <button className="approve-appsel-btn" onClick={handleappcheck}>
          APPROVE SELECTED
        </button>
      </div>
      <div className="approve-list">
        {Exapproval.map((approval, index) => {
          return (
            <div className="approvebox-box" key={index}>
              <div className="approvebox-checkbox">
                <input
                  type="checkbox"
                  onChange={() => {
                    handleClick(approval)
                  }}
                  checked={checklist.includes(approval)}
                ></input>
              </div>
              <Approvalbox
                menu={approval}
                setmodal={setoneshow}
                settarget={settarget}
                setaction={setaction}
                Status={1}
                setdesc={setdesc}
              />
            </div>
          )
        })}
        {/* <Approvalbox
          key={0}
          menuname={"Spaghetti Bologna in Tomato Sauce"}
          cookername={"Mr. Yakkinkao"}
        /> */}
      </div>
      <Modal
        show={show}
        onHide={() => {
          setshow(false)
        }}
      >
        <Modal.Header closeButton>ยืนยันการ{text}อนุมัติสูตรอาหาร</Modal.Header>
        <Modal.Body>
          <h6>รายการสูตรอาหารที่เลือก</h6>
          {checklist.map((approval, index) => {
            return <Approvalbox key={index} menu={approval} />
          })}
          {text && (
            <FormControl
              placeholder="กรุณากรอกสาเหตุการไม่อนุมัติ"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value)
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setshow(false)
            }}
          >
            ยกเลิก
          </Button>
          <Button onClick={onconfirm}>ยืนยัน</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={oneshow}
        onHide={() => {
          setoneshow(false)
        }}
      >
        <Modal.Header closeButton>ยืนยันการ{text}อนุมัติสูตรอาหาร</Modal.Header>
        <Modal.Body>
          <h6>รายการสูตรอาหารที่เลือก</h6>
          <Approvalbox menu={target} />
          {!action && (
            <FormControl
              placeholder="กรุณากรอกสาเหตุการไม่อนุมัติ"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value)
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setoneshow(false)
            }}
          >
            ยกเลิก
          </Button>
          <Button onClick={ononeconfirm}>ยืนยัน</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default Approve
