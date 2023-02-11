import { Button, Form, Modal } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import { GetSystemIngredient, GetSystemKitchenware, AddSysIngredient, AddSysKitchenware } from "../../script/controller";
import "../Ref.css";
import { FaPlus } from "react-icons/fa";

const AddIng = () => {
  const [categoryData] = useState({
    meat: "63148bc17afa87e2439351d4",
    veggie: "63148c731fd415225d9d18cd",
    condiment: "63148cee1fd415225d9d18d1",
    flour: "6326f032899f2ff5706099a7",
    other: "6326f0b9899f2ff5706099ab",
  });
  const [currentIngShow, setCurrentIngShow] = useState("all");
  const [ingredient, setIngredient] = useState([]);
  const [kitchenware, setKitchenware] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowTwo, setModalShowTwo] = useState(false);
  const typeRef = useRef("");
  const nameRef = useRef("");
  const unitRef = useRef("");
  const kitRef = useRef("");
  useEffect(() => {
    const fetchdata = async () => {
      const sysIngedients = await GetSystemIngredient();
      const sysKitchenware = await GetSystemKitchenware();
      setIngredient(sysIngedients.data);
      setKitchenware(sysKitchenware.data);
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="refpage">
        <h1 className="text-center">เพิ่มวัตถุดิบและอุปกรณ์การทำอาหารลงในระบบ</h1>
        <div className="refpage-lower-section">
          <div className="refpage-category">
            <div
              className={
                currentIngShow === "all" ? "category-card is-active" : "category-card"
              }
              style={{ border: "none" }}
              onClick={() => setCurrentIngShow("all")}
            >
              ทั้งหมด
            </div>
            <div
              className={
                currentIngShow === "meat" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("meat")}
            >
              เนื้อสัตว์
            </div>
            <div
              className={
                currentIngShow === "veg" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("veg")}
            >
              ผักผลไม้
            </div>
            <div
              className={
                currentIngShow === "cond" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("cond")}
            >
              เครื่องปรุง
            </div>
            <div
              className={
                currentIngShow === "flour" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("flour")}
            >
              แป้ง
            </div>
            <div
              className={
                currentIngShow === "other" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("other")}
            >
              ไข่/นม/อื่นๆ
            </div>
            <div
              className={
                currentIngShow === "tool" ? "category-card is-active" : "category-card"
              }
              onClick={() => setCurrentIngShow("tool")}
            >
              อุปกรณ์ทำอาหาร
            </div>
          </div>
          <div className="refpage-right p-3">
            <h5>วัตถุดิบและอุปกรณ์ทำอาหารในระบบ</h5>
            <div className="text-end">
              <Button className="m-1" variant="primary" onClick={
                () => {
                  setModalShow(true);
                }
              }><FaPlus />{" "}เพิ่มวัตถุดิบ</Button>
              <Button className="m-1" variant="primary" onClick={
                () => {
                  setModalShowTwo(true);
                }
              }><FaPlus />{" "}เพิ่มอุปกรณ์</Button>
            </div>
            <div className="sys-ingredient-list">
              <div
                style={{
                  display:
                    currentIngShow === "meat" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  ingredient.map((ing, id) => {
                    if (ing.categoryID === categoryData.meat) {
                      return <div key={id}>{ing.name}</div>;
                    }
                  })
              }</div>
              <div
                style={{
                  display:
                    currentIngShow === "veg" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  ingredient.map((ing, id) => {
                    if (ing.categoryID === categoryData.veggie) {
                      return <div key={id}>{ing.name}</div>;
                    }
                  }
              )}</div>
              
              <div
                style={{
                  display: currentIngShow === "cond" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  ingredient.map((ing, id) => {
                    if (ing.categoryID === categoryData.condiment) {
                      return <div key={id}>{ing.name}</div>;
                    }
                  }
              )}</div>
              <div
                style={{
                  display: currentIngShow === "flour" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  ingredient.map((ing, id) => {
                    if (ing.categoryID === categoryData.flour) {
                      return <div key={id}>{ing.name}</div>;
                    }
                  }
              )}</div>
              <div
                style={{
                  display: currentIngShow === "other" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  ingredient.map((ing, id) => {
                    if (ing.categoryID === categoryData.other) {
                      return <div key={id}>{ing.name}</div>;
                    }
                  }
              )}</div>
              <div
                style={{
                  display: currentIngShow === "tool" || currentIngShow === "all"
                      ? "block" : "none",
                }}
              >{
                  kitchenware.map((kitware, id) => {
                    return <div key={id}>{kitware.name}</div>;
                  }
              )}</div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
      >
        <Form onSubmit={
          async (e) => {
            e.preventDefault();
            const token = JSON.parse(localStorage.getItem("token"));
            const newIngredient = {
              name: nameRef.current.value,
              unit: unitRef.current.value,
              categoryID: categoryData[typeRef.current.value],
            };
            if (newIngredient.name === "" || newIngredient.unit === "") {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }
            const newIng = await AddSysIngredient(token, newIngredient);
            if (newIng.success) {
              alert("เพิ่มวัตถุดิบสำเร็จ");
            } else {
              alert("เพิ่มวัตถุดิบไม่สำเร็จ");
            }
          }
        }>
          <Modal.Header className="text-center" style={{ fontSize: "28px" }}>
            เพิ่มวัตถุดิบลงในระบบ
          </Modal.Header>
          <Modal.Body>
            <Form.Label>ชื่อวัตถุดิบ</Form.Label>
            <Form.Control ref={nameRef} type="text" placeholder="กรอกชื่อวัตถุดิบ" />
            <Form.Label>หน่วย (กรัม ช้อนชา อื่นๆ)</Form.Label>
            <Form.Control ref={unitRef} type="text" placeholder="กรอกหน่วย" />
            <Form.Label>ประเภท</Form.Label>
            <Form.Control ref={typeRef} as="select">
              <option>Add Category</option>
              <option>meat</option>
              <option>veggie</option>
              <option>condiment</option>
              <option>flour</option>
              <option>other</option>
            </Form.Control>
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button variant="secondary" type="submit" onClick={() => setModalShow(false)}>ADD</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={modalShowTwo}
        onHide={() => setModalShowTwo(false)}
        centered
      >
        <Form onSubmit={
          async (e) => {
            e.preventDefault();
            const token = JSON.parse(localStorage.getItem("token"));
            const newKitchenware = {
              name: kitRef.current.value,
            };
            if (newKitchenware.name === "") {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }
            console.log(newKitchenware);
            const newKit = await AddSysKitchenware(token, newKitchenware);
            console.log(newKit);
            if (newKit.success) {
              alert("เพิ่มอุปกรณ์สำเร็จ");
            } else {
              alert("เพิ่มอุปกรณ์ไม่สำเร็จ");
            }
          }
        }>
          <Modal.Header className="text-center" style={{ fontSize: "28px" }}>
            เพิ่มอุปกรณ์ลงในระบบ
          </Modal.Header>
          <Modal.Body>
            <Form.Label>ชื่ออุปกรณ์</Form.Label>
            <Form.Control ref={kitRef} type="text" placeholder="กรอกชื่ออุปกรณ์" />
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button variant="secondary" type="submit" onClick={() => setModalShowTwo(false)}>ADD</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  )
}
export default AddIng
