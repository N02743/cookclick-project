import React from "react"
import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { FaBan } from "react-icons/fa"

const IngListComponent = (props) => {
  const [IngDummy, setIngDummy] = useState(false)
  return (
    <div style={props.style}>
      {props.ingType.map((ing) => (
        <div className="ref-ing-item" key={ing.id}>
          <Card className="ref-ing-name">
            <Card.Body>{ing.name}</Card.Body>
          </Card>
          {props.ingorware && (
            <>
              <Form.Control
                disabled={props.showEditButton ? true : false}
                type="number"
                min="0"
                placeholder="ปริมาณ"
                onChange={(e) => {
                  ing.ingamount = e.target.value
                  setIngDummy((dummy) => !dummy)
                }}
                className="ref-ing-amount"
                value={ing.ingamount || ""}
              />
              <Card className="ref-ing-unit">
                <Card.Body>{ing.unit}</Card.Body>
              </Card>
            </>
          )}
          <Button
            className=""
            variant="danger"
            onClick={() =>
              props.removeonClick(props.setIng, props.setUniqueIng, ing)
            }
            style={{ display: props.showEditButton ? "none" : "block" }}
          >
            {" "}
            <FaBan />{" "}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default IngListComponent
