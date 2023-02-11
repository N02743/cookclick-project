import React, { useState, useEffect } from "react"
import MCard from "../components/MCard"
import { GetAllMeFavMenu } from "../script/controller"

function Myfav() {
  const [ignore, setignore] = useState(false)
  const [favmenu, setfavmenu] = useState([])
  useEffect(() => {
    async function fetchdata(token) {
      const allmenu = await GetAllMeFavMenu(token)
      console.log(allmenu.data)
      setfavmenu(allmenu.data)
    }
    if (!ignore) {
      let token = JSON.parse(localStorage.getItem("token"))
      fetchdata(token)
    }
    return () => {
      setignore(true)
    }
  })

  return (
    <>
      <div className="flex flex-col align-items-center">
        <h1>สูตรอาหารที่ฉันชื่นชอบ</h1>
        <div className="common-home flex flex-col align-items-center">
          <div className="flex flex-col width-100">
            {favmenu.map((food, index) => {
              return (
                <MCard
                  key={index}
                  FoodName={food[0].name}
                  FoodImg={food[0].image}
                  Star={food[0].rating}
                  Fav={food[0].favCount}
                  Desc={food[0].description}
                  MenuID={food[0]._id}
                  UserID={food[0].userID}
                  Status={food[0].status}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Myfav
