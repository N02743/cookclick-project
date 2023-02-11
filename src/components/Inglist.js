import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { FaBan } from "react-icons/fa"

const Inglist = ({ ing }) => {
  return (
    <div className="ref-ing-item">
      <Card className="ref-ing-card-ing-name">
        <Card.Body>{ing.ingname}</Card.Body>
      </Card>
      <Card className="ref-ing-card-ing-amount">
        <Card.Body>{ing.ingamount}</Card.Body>
      </Card>
      <Button className="" variant="danger">
        {" "}
        <FaBan />{" "}
      </Button>
      <Button className="" variant="success">
        {" "}
        แก้ไข{" "}
      </Button>
    </div>
  )
}

export default Inglist
