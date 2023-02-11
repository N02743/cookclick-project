import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"
import MCard from "../components/MCard"
import MCardCanDelete from "../components/MCardCanDelete"
import { GetAllMeMenuStatus } from "../script/controller"

function Menulist() {
  const [pubfoods, setpubfoods] = useState([])
  const [waitfoods, setwaitfoods] = useState([])
  const [draftfoods, setdraftfoods] = useState([])
  const [rejfoods, setrejfoods] = useState([])
  const [ignore, setignore] = useState(false)
  function typeset(allmenu) {
    let newdraft = []
    let newwait = []
    let newpub = []
    let newrej = []
    allmenu.forEach((data) => {
      if (data.status === 1) {
        newdraft.push(data)
      } else if (data.status === 2) {
        newwait.push(data)
      } else if (data.status === 3) {
        newpub.push(data)
      } else if (data.status === 4) {
        newrej.push(data)
      }
    })
    setdraftfoods(newdraft)
    setpubfoods(newpub)
    setwaitfoods(newwait)
    setrejfoods(newrej)
  }

  const [token, setToken] = useState("")

  async function fetchdata(token) {
    const allmenu = await GetAllMeMenuStatus(token)
    typeset(allmenu.data)
  }

  useEffect(() => {
    if (!ignore) {
      let myToken = JSON.parse(localStorage.getItem("token"));
      setToken(myToken)
      fetchdata(myToken)
    }
    return () => {
      setignore(true)
    }
  },[])
  const [open0, setOpen0] = useState(true)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const callToActionBtns = document.querySelectorAll(".featurebutton")

  callToActionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      callToActionBtns.forEach((f) => f.classList.remove("feature-active"))
      e.target.classList.toggle("feature-active")
    })
  })

  return (
    <>
      <div className="flex flex-col align-items-center">
        
        <h1>สูตรอาหารของคุณ</h1>
        <div className="common-home flex justify-content-evenly">
          <Button
            className="featurebutton feature-active shadow-none"
            onClick={() => {
              setOpen0(true)
              setOpen1(false)
              setOpen2(false)
              setOpen3(false)
            }}
            aria-controls="today-collapse-text"
            aria-expanded={open0}
          >
            เผยแพร่แล้ว
          </Button>
          <Button
            className="featurebutton shadow-none"
            onClick={() => {
              setOpen0(false)
              setOpen1(true)
              setOpen2(false)
              setOpen3(false)
            }}
            aria-controls="week-collapse-text"
            aria-expanded={open1}
          >
            รออนุมัติ
          </Button>
          <Button
            className="featurebutton shadow-none"
            onClick={() => {
              setOpen0(false)
              setOpen1(false)
              setOpen2(true)
              setOpen3(false)
            }}
            aria-controls="month-collapse-text"
            aria-expanded={open2}
          >
            แบบร่าง
          </Button>
          <Button
            className="featurebutton shadow-none"
            onClick={() => {
              setOpen0(false)
              setOpen1(false)
              setOpen2(false)
              setOpen3(true)
            }}
            aria-controls="month-collapse-text"
            aria-expanded={open3}
          >
            ถูกปฏิเสธ
          </Button>
        </div>
        <div className="common-home flex flex-col align-items-center">
          <Collapse in={open0}>
            <div className="flex flex-col width-100">
              {pubfoods.map((food, index) => {
                return (
                  <MCardCanDelete
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Desc={food.description}
                    Star={food.rating}
                    Fav={food.favCount}
                    MenuID={food._id}
                    Status={food.status}
                    UserID={food.userID}
                    Token={token}
                    FetchData={fetchdata}
                  />
                )
              })}
            </div>
          </Collapse>
          <Collapse in={open1}>
            <div className="flex flex-col width-100">
              {waitfoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Desc={food.description}
                    MenuID={food._id}
                    Status={food.status}
                    UserID={food.userID}
                  />
                )
              })}
            </div>
          </Collapse>
          <Collapse in={open2}>
            <div className="flex flex-col width-100">
              {draftfoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Desc={food.description}
                    MenuID={food._id}
                    Status={food.status}
                    UserID={food.userID}
                  />
                )
              })}
            </div>
          </Collapse>
          <Collapse in={open3}>
            <div className="flex flex-col width-100">
              {rejfoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Desc={food.description}
                    MenuID={food._id}
                    Status={food.status}
                    UserID={food.userID}
                  />
                )
              })}
            </div>
          </Collapse>
        </div>
      </div>
    </>
  )
}
export default Menulist
