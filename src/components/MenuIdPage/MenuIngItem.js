import React from "react"
import { FaRegBell } from "react-icons/fa"

const MenuIngItem = (p) => {
  return (
    <div className="menu-ing-item" style={{backgroundColor: p.index%2===0? "rgb(0,0,0,0.16)" : "none" }}>
      <div className="menu-ing-item-right"><li>{p.name}</li></div>
      <div className="menu-ing-item-left">{p.amount} {p.unit}</div>
    </div>
  )
}

export default MenuIngItem
