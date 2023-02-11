import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FaPlus } from "react-icons/fa"

const CustomToggle = React.forwardRef(({ children, onClick }) => (
  <span
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
    className="dropdown-atag"
  >
    {children}
    &#x25bc;
  </span>
))

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("")

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value ||
              child.props.children.toLowerCase().startsWith(value.toLowerCase())
          )}
        </ul>
      </div>
    )
  }
)

function Ingdropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <Button>
          <FaPlus />
          เพิ่มวัตถุดิบ
        </Button>
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1">หมู</Dropdown.Item>
        <Dropdown.Item eventKey="2">หมา</Dropdown.Item>
        <Dropdown.Item eventKey="3">วัว</Dropdown.Item>
        <Dropdown.Item eventKey="4">ไก่</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Ingdropdown
