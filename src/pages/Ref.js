import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import {
  AddorEditIngredient,
  AddorEditKitchenware,
  GetAllMeIngredient,
  GetAllMeKitware,
  GetSystemIngredient,
  GetSystemKitchenware,
} from "../script/controller";
import Modal from "react-bootstrap/Modal";
import { Offcanvas } from "react-bootstrap";
import "./Ref.css";
import IngListComponent from "../components/IngListComponent";

const Ref = () => {
  // email: simonys@gmail.com
  // password: simonys

  const [categoryData] = useState({
    meat: "63148bc17afa87e2439351d4",
    veggie: "63148c731fd415225d9d18cd",
    condiment: "63148cee1fd415225d9d18d1",
    flour: "6326f032899f2ff5706099a7",
    other: "6326f0b9899f2ff5706099ab",
  });

  const sortByCategory = (element) => {
    Object.keys(categoryData).forEach((e) => {
      if (element.categoryID === categoryData[e]) {
        if (e === "meat") {
          setMeatIng([...meatIng, element]);
        } else if (e === "veggie") {
          setVegIng([...vegIng, element]);
        } else if (e === "condiment") {
          setCondIng([...condIng, element]);
        } else if (e === "flour") {
          setFlourIng([...flourIng, element]);
        } else if (e === "other") {
          setOtherIng([...otherIng, element]);
        }
      }
    });
  };

  const addEntryClick = (element) => {
    const isDuplicate = uniqueingid.includes(element._id);
    if (
      element.categoryID === undefined &&
      !uniquetoolid.includes(element._id)
    ) {
      setTool([...Tool, element]);
      setuniquetoolid([...uniquetoolid, element._id]);
    } else if (!isDuplicate) {
      sortByCategory(element);
      setuniqueingid([...uniqueingid, element._id]);
    }
    setCurrentIngShow("all");
    handleCloseing();
    handleClosetool();
  };

  const filterIngByCategory = (IngData, ToolData) => {
    IngData.forEach((eachIng) => {
      const newIngEntry = {
        _id: eachIng._id,
        categoryID: eachIng.categoryID,
        ingamount: eachIng.amount,
        name: eachIng.name,
        id: eachIng.id,
        unit: eachIng.unit,
      };
      if (eachIng.categoryID === "63148bc17afa87e2439351d4") {
        setMeatIng((meatIng) => [...meatIng, newIngEntry]);
      } else if (eachIng.categoryID === "63148c731fd415225d9d18cd") {
        setVegIng((vegIng) => [...vegIng, newIngEntry]);
      } else if (eachIng.categoryID === "63148cee1fd415225d9d18d1") {
        setCondIng((condIng) => [...condIng, newIngEntry]);
      } else if (eachIng.categoryID === "6326f032899f2ff5706099a7") {
        setFlourIng((flourIng) => [...flourIng, newIngEntry]);
      } else if (eachIng.categoryID === "6326f0b9899f2ff5706099ab") {
        setOtherIng((otherIng) => [...otherIng, newIngEntry]);
      }
    });
    ToolData.forEach((eachTool) => {
      const newToolEntry = {
        _id: eachTool._id,
        name: eachTool.name,
        id: eachTool.id,
      };
      setTool((prevTool) => [...prevTool, newToolEntry]);
    });
  };

  // const [ignore, setignore] = useState(false);
  const [ingData, setIngData] = useState([]);
  const [wareData, setWareData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const UpdateCurrentIngredientKitchenware = async () => {
    if (ignore.current) return;
    ignore.current = true;
    const ingfulldata = await GetSystemIngredient(token);
    const warefulldata = await GetSystemKitchenware(token);
    const myingredient = await GetAllMeIngredient(token);
    const mytool = await GetAllMeKitware(token);
    let i = 0;
    ingfulldata.data.forEach((element) => {
      element.id = i;
      i += 1;
    });
    i = 0;
    warefulldata.data.forEach((element) => {
      element.id = i;
      i += 1;
    });
    const menuIngredients = myingredient.ingredient.map((ing) => ({
      ...ingfulldata.data.find((ingFull) => ingFull._id === ing.ingredientID),
      amount: ing.amount,
    }));
    const menuWares = mytool.kitchenware.map((tool) => ({
      ...warefulldata.data.find(
        (wareFull) => wareFull._id === tool.kitchenwareID
      ),
    }));
    setWareData(warefulldata.data);
    setIngData(ingfulldata.data);
    filterIngByCategory(menuIngredients, menuWares);
    menuIngredients.forEach((eachIng) =>
      setuniqueingid((prev) => [...prev, eachIng._id])
    );
    mytool.kitchenware.forEach((eachTool) => {
      setuniquetoolid((prev) => [...prev, eachTool.kitchenwareID]);
    });
  };

  const ignore = React.useRef(false);
  useEffect(() => {
    UpdateCurrentIngredientKitchenware();
  });

  const removeonClick = (setFunc, setUniqueFunc, element) => {
    setFunc((current) =>
      current.filter((ing) => {
        return ing._id !== element._id;
      })
    );
    setUniqueFunc((current) =>
      current.filter((item) => {
        return item !== element._id;
      })
    );
  };

  const [showing, setshowing] = useState(false);
  const [showtool, setshowtool] = useState(false);
  const handleShowtool = (e) => {
    e.preventDefault();
    setshowtool(true);
  };
  const handleClosetool = () => setshowtool(false);
  const handleCloseing = () => setshowing(false);
  const handleShowing = (e) => {
    e.preventDefault();
    setshowing(true);
  };
  const [keywording, setkeywording] = useState("");

  const [meatIng, setMeatIng] = useState([]);
  const [vegIng, setVegIng] = useState([]);
  const [condIng, setCondIng] = useState([]);
  const [flourIng, setFlourIng] = useState([]);
  const [otherIng, setOtherIng] = useState([]);
  const [uniqueingid, setuniqueingid] = useState([]);
  const [Tool, setTool] = useState([]);
  const [uniquetoolid, setuniquetoolid] = useState([]);
  const [currentIngShow, setCurrentIngShow] = useState("all");
  const [IngBeforeEdit, setIngBeforeEdit] = useState({
    meat: [],
    veg: [],
    flour: [],
    cond: [],
    other: [],
    uniqueing: [],
    uniquetoolid: [],
  });

  const [showAddIngButton, setShowAddIngButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [SubmitConfirmation, setSubmitConfirmation] = useState(false);
  const [nullAmountAlert, setNullAmountAlert] = useState(false);
  const [DiscardChange, setDiscardChange] = useState(false);

  const handleStartEditing = (
    meat,
    veg,
    cond,
    flour,
    other,
    tool,
    uing,
    utool
  ) => {
    setShowAddIngButton(true);
    setShowEditButton(false);
    const meatCopy = JSON.parse(JSON.stringify(meat));
    const vegCopy = JSON.parse(JSON.stringify(veg));
    const condCopy = JSON.parse(JSON.stringify(cond));
    const flourCopy = JSON.parse(JSON.stringify(flour));
    const otherCopy = JSON.parse(JSON.stringify(other));
    const toolCopy = JSON.parse(JSON.stringify(tool));
    const uingCopy = JSON.parse(JSON.stringify(uing));
    const utoolCopy = JSON.parse(JSON.stringify(utool));
    setIngBeforeEdit({
      meat: meatCopy,
      veg: vegCopy,
      flour: flourCopy,
      cond: condCopy,
      other: otherCopy,
      tool: toolCopy,
      uniqueing: uingCopy,
      uniquetool: utoolCopy,
    });
    console.log("start editing");
  };

  const handleRevertChange = () => {
    setMeatIng(IngBeforeEdit.meat);
    setVegIng(IngBeforeEdit.veg);
    setFlourIng(IngBeforeEdit.flour);
    setCondIng(IngBeforeEdit.cond);
    setOtherIng(IngBeforeEdit.other);
    setTool(IngBeforeEdit.tool);
    setuniqueingid(IngBeforeEdit.uniqueing);
    setuniquetoolid(IngBeforeEdit.uniquetool);
  };

  const handleDiscardChange = () => {
    setShowAddIngButton(false);
    setShowEditButton(true);
    setDiscardChange(false);
    handleRevertChange();
  };

  const handleSubmit = async () => {
    let IngList = [];
    let ToolList = [];
    Tool.forEach((eachTool) => {
      ToolList.push(eachTool._id);
    });
    const handleIngList = (IngCategory) => {
      IngCategory.forEach((eachIng) => {
        IngList.push({
          ingredientID: eachIng._id,
          amount: parseInt(eachIng.ingamount),
        });
      });
    };
    handleIngList(meatIng);
    handleIngList(vegIng);
    handleIngList(condIng);
    handleIngList(flourIng);
    handleIngList(otherIng);
    let isIngAmountNull = false;
    IngList.forEach((eachIng) => {
      if (isNaN(eachIng.amount)) {
        console.log(isNaN(eachIng.amount));
        setNullAmountAlert(true);
        isIngAmountNull = true;
      }
    });
    if (isIngAmountNull) return;
    setShowAddIngButton(false);
    setShowEditButton(true);
    setSubmitConfirmation(false);
    let AddOrEditIngredientInfo = {
      ingredient: IngList,
    };
    let AddOrEditKitchenwareInfo = {
      kitchenware: ToolList,
    };
    console.log(AddOrEditIngredientInfo);
    console.log(AddOrEditKitchenwareInfo);
    const response = await AddorEditIngredient(token, AddOrEditIngredientInfo);
    const response2 = await AddorEditKitchenware(
      token,
      AddOrEditKitchenwareInfo
    );
    console.log(response);
    console.log(response2);
  };
  return (
    <div className="refpage">
      <h1 className="text-center">จัดการวัตถุดิบในตู้เย็น</h1>
      <div className="refpage-lower-section">
        <div className="refpage-category">
          <div
            className={
              currentIngShow === "all"
                ? "category-card is-active"
                : "category-card"
            }
            style={{ border: "none" }}
            onClick={() => setCurrentIngShow("all")}
          >
            ทั้งหมด
          </div>
          <div
            className={
              currentIngShow === "meat"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("meat")}
          >
            เนื้อสัตว์
          </div>
          <div
            className={
              currentIngShow === "veg"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("veg")}
          >
            ผักผลไม้
          </div>
          <div
            className={
              currentIngShow === "cond"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("cond")}
          >
            เครื่องปรุง
          </div>
          <div
            className={
              currentIngShow === "flour"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("flour")}
          >
            แป้ง
          </div>
          <div
            className={
              currentIngShow === "other"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("other")}
          >
            ไข่/นม/อื่นๆ
          </div>
          <div
            className={
              currentIngShow === "tool"
                ? "category-card is-active"
                : "category-card"
            }
            onClick={() => setCurrentIngShow("tool")}
          >
            อุปกรณ์ทำอาหาร
          </div>
        </div>
        <div className="refpage-right">
          <div className="ref-page-form-box">
            <Form>
              <button
                onClick={(e) => handleShowing(e)}
                className="do-this-menu-button ref-add-button"
                style={{ display: showAddIngButton ? "block" : "none" }}
              >
                <FaPlus />
                เพิ่มวัตถุดิบ
              </button>
              <Offcanvas
                show={showing}
                onHide={() => handleCloseing()}
                placement="top"
                className="searchoffcanvas"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title style={{ margin: "auto" }}>
                    เพิ่มวัตถุดิบ
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="ref-offcanva-body">
                  <Form.Control
                    placeholder="กรอกชื่อวัตถุดิบที่ต้องการเพิ่ม"
                    type="text"
                    onChange={(e) => setkeywording(e.target.value)}
                  />
                  {ingData
                    .filter((ing) =>
                      ing.name.includes(keywording.toLowerCase())
                    )
                    .map((filtereding) => (
                      <button
                        className="ref-offcanva-button"
                        onClick={() => addEntryClick(filtereding)}
                        key={filtereding.id}
                      >
                        {filtereding.name}
                      </button>
                    ))}
                </Offcanvas.Body>
              </Offcanvas>
            </Form>
            <Form>
              <button
                onClick={(e) => handleShowtool(e)}
                className="do-this-menu-button ref-add-button"
                style={{ display: showAddIngButton ? "block" : "none" }}
              >
                <FaPlus />
                เพิ่มอุปกรณ์
              </button>
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
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่ออุปกรณ์ที่ต้องการเพิ่ม"
                    onChange={(e) => {
                      setkeywording(e.target.value);
                    }}
                  />
                  {wareData
                    .filter((ing) =>
                      ing.name.includes(keywording.toLowerCase())
                    )
                    .map((filtereding) => (
                      <button
                        className="ref-offcanva-button"
                        onClick={() => addEntryClick(filtereding)}
                        key={filtereding.id}
                      >
                        {filtereding.name}
                      </button>
                    ))}
                </Offcanvas.Body>
              </Offcanvas>
            </Form>
          </div>
          <div className="ref-page-ingredient-list">
            <IngListComponent
              style={{
                display:
                  currentIngShow === "meat" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={meatIng}
              setIng={setMeatIng}
              setUniqueIng={setuniqueingid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={true}
            />
            <IngListComponent
              style={{
                display:
                  currentIngShow === "veg" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={vegIng}
              setIng={setVegIng}
              setUniqueIng={setuniqueingid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={true}
            />
            <IngListComponent
              style={{
                display:
                  currentIngShow === "cond" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={condIng}
              setIng={setCondIng}
              setUniqueIng={setuniqueingid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={true}
            />
            <IngListComponent
              style={{
                display:
                  currentIngShow === "flour" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={flourIng}
              setIng={setFlourIng}
              setUniqueIng={setuniqueingid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={true}
            />
            <IngListComponent
              style={{
                display:
                  currentIngShow === "other" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={otherIng}
              setIng={setOtherIng}
              setUniqueIng={setuniqueingid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={true}
            />
            <IngListComponent
              style={{
                display:
                  currentIngShow === "tool" || currentIngShow === "all"
                    ? "block"
                    : "none",
              }}
              ingType={Tool}
              setIng={setTool}
              setUniqueIng={setuniquetoolid}
              showEditButton={showEditButton}
              removeonClick={removeonClick}
              ingorware={false}
            />
          </div>
          <div className="submit-button-section">
            <Button
              onClick={() =>
                handleStartEditing(
                  meatIng,
                  vegIng,
                  condIng,
                  flourIng,
                  otherIng,
                  Tool,
                  uniqueingid,
                  uniquetoolid
                )
              }
              className="button-28-green"
              style={{ display: showEditButton ? "block" : "none" }}
            >
              แก้ไขข้อมูลวัตถุดิบ
            </Button>
            <Button
              onClick={() => setDiscardChange(true)}
              className="button-28-red"
              style={{
                display: showEditButton ? "none" : "block",
                margin: "0 0 0 2%",
              }}
            >
              ยกเลิกการเปลี่ยนแปลง
            </Button>
            <Button
              onClick={() => setSubmitConfirmation(true)}
              className="button-28-green"
              style={{ display: showEditButton ? "none" : "block" }}
            >
              ยืนยันการแก้ไข
            </Button>
            <Modal
              show={SubmitConfirmation}
              onHide={() => setSubmitConfirmation(false)}
            >
              <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
                ต้องการยืนยันการเปลี่ยนแปลงหรือไม่?
              </Modal.Body>
              <Modal.Footer className="content-center">
                <Button
                  className="button-28-blue"
                  onClick={() => setSubmitConfirmation(false)}
                >
                  แก้ไขต่อ
                </Button>
                <Button
                  className="button-28-green"
                  onClick={() => handleSubmit()}
                >
                  ยืนยันการแก้ไข
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={DiscardChange}
              onHide={() => setSubmitConfirmation(false)}
            >
              <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
                ต้องการยกเลิกการเปลี่ยนแปลงหรือไม่?
              </Modal.Body>
              <Modal.Footer className="content-center">
                <Button
                  className="button-28-blue"
                  onClick={() => setDiscardChange(false)}
                >
                  แก้ไขต่อ
                </Button>
                <Button
                  className="button-28-red"
                  onClick={() => handleDiscardChange()}
                >
                  ยกเลิกการเปลี่ยนแปลง
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={nullAmountAlert}
              onHide={() => setNullAmountAlert(false)}
            >
              <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
                กรุณาใส่ปริมาณวัตถุดิบที่ต้องการ
              </Modal.Body>
              <Modal.Footer className="content-center">
                <Button
                  className="button-28-green"
                  onClick={() => {
                    setNullAmountAlert(false);
                    setSubmitConfirmation(false);
                  }}
                >
                  กลับ
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ref;
