import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"
import MCard from "../components/MCard"
import {
  GetPopularMenuDay,
  GetPopularMenuMonth,
  GetPopularMenuAll,
} from "../script/controller"






function Home() {
  let baimai;
  const [dfoods, setdfoods] = useState([])
  const [mfoods, setmfoods] = useState([])
  const [afoods, setafoods] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      const day = await GetPopularMenuDay()
      const month = await GetPopularMenuMonth()
      const all = await GetPopularMenuAll()
      setdfoods(day.data)
      setmfoods(month.data)
      setafoods(all.data)
    }
    fetchdata()
  }, [])

  const [open0, setOpen0] = useState(true)
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
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
        <h1>Popular Menu</h1>
        <div className="common-home flex justify-content-evenly">
          <Button
            className="featurebutton feature-active shadow-none"
            onClick={() => {
              setOpen0(true)
              setOpen1(false)
              setOpen2(false)
            }}
            aria-controls="today-collapse-text"
            aria-expanded={open0}
          >
            Today
          </Button>
          <Button
            className="featurebutton shadow-none"
            onClick={() => {
              setOpen0(false)
              setOpen1(true)
              setOpen2(false)
            }}
            aria-controls="week-collapse-text"
            aria-expanded={open1}
          >
            Month
          </Button>
          <Button
            className="featurebutton shadow-none"
            onClick={() => {
              setOpen0(false)
              setOpen1(false)
              setOpen2(true)
            }}
            aria-controls="month-collapse-text"
            aria-expanded={open2}
          >
            All Time
          </Button>
        </div>
        <div className="common-home flex flex-col align-items-center">
          <Collapse in={open0}>
            <div className="flex flex-col width-100" id="today-collapse-text">
              {dfoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Star={food.rating}
                    Fav={food.favCount}
                    Desc={food.description}
                    MenuID={food._id}
                    UserID={food.userID}
                  />
                )
              })}
            </div>
          </Collapse>
          <Collapse in={open1}>
            <div className="flex flex-col width-100" id="week-collapse-text">
              {mfoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Star={food.rating}
                    Fav={food.favCount}
                    Desc={food.description}
                    MenuID={food._id}
                    UserID={food.userID}
                  />
                )
              })}
            </div>
          </Collapse>
          <Collapse in={open2}>
            <div className="flex flex-col width-100" id="month-collapse-text">
              {afoods.map((food, index) => {
                return (
                  <MCard
                    key={index}
                    FoodName={food.name}
                    FoodImg={food.image}
                    Star={food.rating}
                    Fav={food.favCount}
                    Desc={food.description}
                    MenuID={food._id}
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
export default Home
