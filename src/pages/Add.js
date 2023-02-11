import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FaBan, FaPlus } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import Card from "react-bootstrap/Card"
import Offcanvas from "react-bootstrap/Offcanvas"
import { FormControl, Modal } from "react-bootstrap"
import {
  GetSystemIngredient,
  GetSystemKitchenware,
  ImageUpload,
  AddMenu,
  StepImageUpload,
  MenuEdit,
  UpdateMenu,
} from "../script/controller"
import Accordion from "react-bootstrap/Accordion"
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import { useParams, useNavigate } from "react-router-dom"
import { decodeToken } from "react-jwt"

function Add() {
  const token = JSON.parse(localStorage.getItem("token"))
  const userdata = decodeToken(token)
  let navigate = useNavigate()
  const { mid } = useParams()
  const [menuid, setMenuid] = useState(mid)
  const [ingdata, setingdata] = useState([])
  const [waredata, setwaredata] = useState([])
  const [ignore, setignore] = useState(false)
  const [imagename, setimagename] = useState("")
  const [stepimagename, setstepimagename] = useState({})
  const [statusshow, setstatusshow] = useState(false)
  function setup(data, fulling, fullware) {
    console.log(data)
    setrecipename(data.name)
    setrecipedesc(data.description)
    if (data.image) {
      setimagename(data.image)
      setPreview("https://cookclick.code.in.th/images/".concat(data.image))
    }
    let olding = []
    let olduing = []
    data.ingredient.forEach((ing) => {
      for (let i = 0; i < fulling.length; i++) {
        if (fulling[i]._id === ing.ingredientID) {
          let nexting = {}
          nexting._id = fulling[i]._id
          nexting.id = fulling[i].id
          nexting.amount = ing.amount
          nexting.name = fulling[i].name
          nexting.unit = fulling[i].unit
          olding.push(nexting)
          olduing.push(fulling[i].id)
          break
        }
      }
    })
    setinglist(olding)
    setuniqueingid(olduing)
    let oldware = []
    let olduware = []
    data.kitchenware.forEach((ware) => {
      for (let i = 0; i < fullware.length; i++) {
        if (fullware[i]._id === ware.kitchenwareID) {
          let nextware = {}
          nextware._id = fullware[i]._id
          nextware.id = fullware[i].id
          nextware.name = fullware[i].name
          oldware.push(nextware)
          olduware.push(fullware[i].id)
          break
        }
      }
    })
    settoollist(oldware)
    setuniquetoolid(olduware)
    let oldstep = []
    let oldpicstep = {}
    data.cookingstep.forEach((step) => {
      let newstep = { pic: null, id: step.index, desc: step.description }
      if (step.image) {
        stepimagename[step.index] = step.image
        oldpicstep[step.index] = "https://cookclick.code.in.th/images/".concat(
          step.image
        )
      }
      oldstep.push(newstep)
    })
    setsteplist(oldstep)
    setsteppic(oldpicstep)
    console.log(oldpicstep)
    console.log(oldstep)
    if (oldstep.length) {
      setstepindex(oldstep[oldstep.length - 1].id + 1)
    } else {
      setstepindex(0)
    }
  }
  useEffect(() => {
    async function fetchdata() {
      const ingfulldata = await GetSystemIngredient()
      const warefulldata = await GetSystemKitchenware()
      let i = 0
      ingfulldata.data.forEach((element) => {
        element.id = i
        i += 1
        element.amount = 0
      })
      i = 0
      warefulldata.data.forEach((element) => {
        element.id = i
        i += 1
      })
      setwaredata(warefulldata.data)
      setingdata(ingfulldata.data)
      if (mid) {
        const recipedata = await MenuEdit(token, mid)
        if (recipedata.query[0].status !== 1) {
          navigate("../add")
        }
        setup(recipedata.query[0], ingfulldata.data, warefulldata.data)
      }
    }
    if (!ignore) {
      fetchdata()
    }
    return () => {
      setignore(true)
    }
  })
  const [recipename, setrecipename] = useState("")
  const [recipedesc, setrecipedesc] = useState("")
  const [inglist, setinglist] = useState([])
  const [toollist, settoollist] = useState([])
  const [uniqueingid, setuniqueingid] = useState([])
  const [uniquetoolid, setuniquetoolid] = useState([])
  const [steplist, setsteplist] = useState([])
  const [steppic, setsteppic] = useState({})
  const onSelectstepFile = (step, event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    step.pic = event.target.files[0]
    setsteplist([...steplist])
    let numid = step.id
    let newpic = {}
    newpic[numid] = URL.createObjectURL(step.pic)
    setsteppic({ ...steppic, ...newpic })
  }
  const [stepindex, setstepindex] = useState(1)
  const addnewstep = () => {
    let brandnewstep = {
      desc: "ขั้นตอนลำดับที่ ".concat(stepindex),
      pic: null,
      id: stepindex,
    }
    setstepindex(stepindex + 1)
    setsteplist([...steplist, brandnewstep])
  }
  const changedesc = (step, value) => {
    if (value === "") {
      step.desc = "ขั้นตอนลำดับที่ ".concat(step.id)
      setsteplist([...steplist])
      return
    }
    step.desc = value
    setsteplist([...steplist])
  }
  const addEntryClick = (t, element) => {
    if (t === 0) {
      const isDuplicate = uniqueingid.includes(element.id)
      if (!isDuplicate) {
        setinglist([...inglist, element])
        setuniqueingid([...uniqueingid, element.id])
      }
      handleCloseing()
    } else {
      const isDuplicate = uniquetoolid.includes(element.id)
      if (!isDuplicate) {
        settoollist([...toollist, element])
        setuniquetoolid([...uniquetoolid, element.id])
      }
      handleClosetool()
    }
  }
  const ingsetamount = (ing, amount) => {
    ing.amount = amount
  }
  const removeonClick = (t, element) => {
    if (t === 0) {
      let index = uniqueingid.indexOf(element.id)
      setinglist(inglist.slice(0, index).concat(inglist.slice(index + 1)))
      setuniqueingid(
        uniqueingid.slice(0, index).concat(uniqueingid.slice(index + 1))
      )
    } else if (t === 1) {
      let index = uniquetoolid.indexOf(element.id)
      settoollist(toollist.slice(0, index).concat(toollist.slice(index + 1)))
      setuniquetoolid(
        uniquetoolid.slice(0, index).concat(uniquetoolid.slice(index + 1))
      )
    } else {
      let index = steplist.indexOf(element)
      setsteplist(steplist.slice(0, index).concat(steplist.slice(index + 1)))
    }
  }
  const [showing, setshowing] = useState(false)
  const handleCloseing = () => setshowing(false)
  const handleShowing = () => setshowing(true)
  const [keywording, setkeywording] = useState("")
  const [showtool, setshowtool] = useState(false)
  const handleClosetool = () => setshowtool(false)
  const handleShowtool = () => setshowtool(true)
  const [keywordtool, setkeywordtool] = useState("")
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [failtext, setfailtext] = useState("การอัปโหลดสำเร็จ")

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(event.target.files[0])
    let newpic = URL.createObjectURL(event.target.files[0])
    setPreview(newpic)
  }
  const send = async (ready) => {
    let lastinglist = []
    inglist.forEach((element) => {
      let nexting = { ingredientID: element._id, amount: element.amount }
      lastinglist.push(nexting)
    })
    let lastwarelist = []
    toollist.forEach((element) => {
      let nextware = { kitchenwareID: element._id }
      lastwarelist.push(nextware)
    })
    let laststeplist = []
    steplist.forEach((element) => {
      let nextstep = { index: element.id, description: element.desc }
      if (!element.pic) {
        if (stepimagename[element.id]) {
          nextstep.image = stepimagename[element.id]
        }
      }
      laststeplist.push(nextstep)
    })
    const ingarray = {
      name: recipename,
      image: imagename,
      description: recipedesc,
      status: ready,
      ingredient: lastinglist,
      kitchenware: lastwarelist,
      cookingstep: laststeplist,
    }
    if (!menuid) {
      const response = await AddMenu(token, ingarray)
      if (response.success) {
        setMenuid(response.id)
        if (selectedFile) {
          const menuImage = new FormData()
          menuImage.append("menu_image", selectedFile, selectedFile.name)
          const rep = await ImageUpload(token, menuImage, response.id)
          if (!rep.status) {
            setfailtext("เกิดความผิดพลาดในการอัปโหลดภาพปก")
          }
        }
        steplist.forEach(async (element) => {
          if (element.pic) {
            const stepImage = new FormData()
            stepImage.append("step_image", element.pic, element.pic.name)
            const res = await StepImageUpload(
              token,
              stepImage,
              response.id,
              element.id
            )
            if (!res.status) {
              setfailtext(
                `เกิดความผิดพลาดในการอัปโหลดภาพในขั้นตอนที่ ${element.id + 1}`
              )
            }
          }
        })
      } else {
        setfailtext("เกิดความผิดพลาดในการอัปโหลดสูตรอาหาร")
      }
    } else {
      const response = await UpdateMenu(token, ingarray, menuid)
      if (!response.success) {
        console.log("error")
        setfailtext("เกิดความผิดพลาดในการอัปโหลดสูตรอาหาร")
      } else {
        if (selectedFile) {
          const menuImage = new FormData()
          menuImage.append("menu_image", selectedFile, selectedFile.name)
          const rep = await ImageUpload(token, menuImage, response.id)
          if (!rep.status) {
            setfailtext("เกิดความผิดพลาดในการอัปโหลดภาพปก")
          }
        }
        steplist.forEach(async (element) => {
          if (element.pic) {
            const stepImage = new FormData()
            stepImage.append("step_image", element.pic, element.pic.name)
            const res = await StepImageUpload(
              token,
              stepImage,
              response.id,
              element.id
            )
            if (!res.status) {
              setfailtext(
                `เกิดความผิดพลาดในการอัปโหลดภาพในขั้นตอนที่ ${element.id + 1}`
              )
            }
          }
        })
      }
    }
    setstatusshow(true)
  }

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey)
    return (
      <Button
        className="mx-2"
        variant="outline-dark"
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    )
  }

  return (
    <>
      <div className="flex flex-col align-items-center">
        <Form className="common-home">
          <div className="mb-3 add-pic-recipe">
            <Form.Control type="file" onChange={onSelectFile} />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="add-pic-pre"
                thumbnail="true"
              />
            )}
          </div>
          <Form.Group className="mb-3" controlId="AddName">
            <Form.Control
              type="text"
              placeholder="ใส่ชื่อสูตรอาหาร"
              onChange={(e) => setrecipename(e.target.value)}
              value={recipename}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="AddDesc">
            <Form.Control
              type="text"
              placeholder="ใส่คำอธิบายของสูตรอาหาร"
              as="textarea"
              onChange={(e) => setrecipedesc(e.target.value)}
              value={recipedesc}
            />
          </Form.Group>
          <Button onClick={handleShowing} className="add-ing-button">
            <FaPlus />
            เพิ่มวัตถุดิบ
          </Button>
          <Offcanvas
            show={showing}
            onHide={handleCloseing}
            placement="top"
            className="searchoffcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{ margin: "auto" }}>
                เพิ่มวัตถุดิบ
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="ref-offcanva-body">
              <FormControl
                placeholder="กรอกวัตถุดิบที่ต้องการเพิ่ม"
                type="text"
                onChange={(e) => setkeywording(e.target.value)}
              />
              {ingdata
                .filter((ing) => ing.name.includes(keywording.toLowerCase()))
                .map((filtereding) => (
                  <button
                    className="ref-offcanva-button"
                    onClick={() => addEntryClick(0, filtereding)}
                    key={filtereding.id}
                  >
                    {filtereding.name}
                  </button>
                ))}
            </Offcanvas.Body>
          </Offcanvas>
          <div className="add-ing-box">
            {inglist.map((ing) => (
              <div className="add-ing-item" key={ing.id}>
                <Card className="add-ing-name">
                  <Card.Body>{ing.name}</Card.Body>
                </Card>
                <Form.Control
                  type="number"
                  placeholder={ing.amount}
                  min="0"
                  onChange={(e) => ingsetamount(ing, e.target.value)}
                  className="add-ing-amount"
                />
                <Card className="add-ing-unit">
                  <Card.Body>{ing.unit}</Card.Body>
                </Card>

                <Button
                  className=""
                  variant="danger"
                  onClick={() => removeonClick(0, ing)}
                >
                  {" "}
                  <FaBan />{" "}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleShowtool} className="add-tool-button">
            <FaPlus />
            เพิ่มอุปกรณ์
          </Button>
          <Offcanvas
            show={showtool}
            onHide={handleClosetool}
            placement="top"
            className="searchoffcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{ margin: "auto" }}>
                เพิ่มอุปกรณ์
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="ref-offcanva-body">
              <FormControl
                placeholder="กรอกอุปกรณ์ที่ต้องการเพิ่ม"
                type="text"
                onChange={(e) => setkeywordtool(e.target.value)}
              />
              {waredata
                .filter((tool) => tool.name.includes(keywordtool.toLowerCase()))
                .map((filteredtool) => (
                  <button
                    className="ref-offcanva-button"
                    onClick={() => addEntryClick(1, filteredtool)}
                    key={filteredtool.id}
                  >
                    {filteredtool.name}
                  </button>
                ))}
            </Offcanvas.Body>
          </Offcanvas>
          <div className="add-tool-box">
            {toollist.map((tool) => (
              <div className="add-tool-item" key={tool.id}>
                <Card className="add-tool-name">
                  <Card.Body>{tool.name}</Card.Body>
                </Card>
                <Button
                  className=""
                  variant="danger"
                  onClick={() => removeonClick(1, tool)}
                >
                  {" "}
                  <FaBan />{" "}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={() => addnewstep()} className="add-step-button">
            <FaPlus />
            เพิ่มขั้นตอน
          </Button>
          <Accordion className="accordion" flush>
            {steplist.map((step) => (
              <Card key={step.id}>
                <Card.Header className="add-step-header">
                  <span>{step.desc}</span>
                  <div>
                    <Button
                      className="py-1.5 px-2.5 mx-2"
                      variant="outline-dark"
                      onClick={() => removeonClick(2, step)}
                    >
                      <FaBan />
                    </Button>
                    <CustomToggle eventKey={step.id}>
                      <IoIosArrowDown />
                    </CustomToggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={step.id}
                  className="accordionitem"
                >
                  <Card.Body>
                    <div className="stepremovebutton">
                      <Form.Control
                        type="file"
                        onChange={(e) => onSelectstepFile(step, e)}
                      />
                    </div>
                    <div className="steppiccenter">
                      {steppic[step.id] && (
                        <img
                          src={steppic[step.id]}
                          className="add-pic-pre"
                          thumbnail="true"
                          alt="preview"
                        />
                      )}
                    </div>
                    <FormControl
                      type="text"
                      as="textarea"
                      placeholder="กรุณากรอกขั้นตอนวิธีการทำ"
                      onChange={(e) => changedesc(step, e.target.value)}
                      value={step.desc}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
            {/* {steplist.map((step) => (
              <Accordion.Item eventKey={step.id} key={step.id}>
                <Accordion.Header>{step.desc}</Accordion.Header>
                <Accordion.Body className="accordionitem">
                  <div className="stepremovebutton">
                    <Form.Control
                      type="file"
                      onChange={(e) => onSelectstepFile(step, e)}
                    />
                    <Button
                      className=""
                      variant="danger"
                      onClick={() => removeonClick(2, step)}
                    >
                      {" "}
                      <FaBan />{" "}
                    </Button>
                  </div>
                  <div className="steppiccenter">
                    {steppic[steplist.indexOf(step)] && (
                      <img
                        src={steppic[steplist.indexOf(step)]}
                        className="add-pic-pre"
                        thumbnail="true"
                        alt="preview"
                      />
                    )}
                  </div>
                  <FormControl
                    type="text"
                    as="textarea"
                    placeholder="กรุณากรอกขั้นตอนวิธีการทำ"
                    onChange={(e) => changedesc(step, e.target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))} */}
          </Accordion>
          <div className="button-box">
            <Button
              className="savebutton"
              variant="success"
              onClick={(e) => {
                send(1)
                e.preventDefault()
              }}
            >
              บันทึกสูตรอาหาร
            </Button>
            <div className="blank-box"></div>
            <Button
              className="submitbutton"
              variant="success"
              onClick={(e) => {
                send(2)
                e.preventDefault()
              }}
            >
              ยืนยันการสร้างสูตรอาหาร
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        show={statusshow}
        onHide={() => {
          setstatusshow(false)
        }}
      >
        <Modal.Header>สถานะการอัปโหลด</Modal.Header>
        <Modal.Body>{failtext}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("../Mymenu")}>
            ไปที่หน้าสูตรอาหารของฉัน
          </Button>
          <Button
            onClick={() => {
              if (failtext !== "เกิดความผิดพลาดในการอัปโหลดสูตรอาหาร") {
                navigate(`../Add/${userdata.userID}/${menuid}`)
              }
              setfailtext("การอัปโหลดสำเร็จ")
              setstatusshow(false)
            }}
          >
            ปิดหน้าต่าง
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
