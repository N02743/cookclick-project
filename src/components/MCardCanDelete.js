import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
  TiHeartFullOutline,
  TiCamera,
} from "react-icons/ti";

import { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { DelMenu } from "../script/controller";

const MCard = ({
  FoodName,
  FoodImg,
  Star,
  Fav,
  Desc,
  MenuID,
  Status,
  UserID,
  Token,
  FetchData
}) => {
  const addStar = (nowStar) => {
    if (Star == null) {
      return;
    }
    nowStar = nowStar - 1;
    if (Star - nowStar > 0.8) {
      return <TiStarFullOutline />;
    } else if (Star - nowStar > 0.3) {
      return <TiStarHalfOutline />;
    } else {
      return <TiStarOutline />;
    }
  };
  let linkwarp = "";
  if (Status == null || Status === 3) {
    linkwarp = `menuId/${UserID}/${MenuID}`;
  } else if (Status === 2) {
    linkwarp = `menuId/waiting/${UserID}/${MenuID}`;
  } else {
    linkwarp = `/add/${UserID}/${MenuID}`;
  }

  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const DeleteMenu = async () => {
    const response = await DelMenu(Token, MenuID);
    console.log(response)
    FetchData(Token)
	setDeleteConfirmation(false);
  }

  return (
    <div className="flex menu-card-can-delete">
      <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            ยืนยันลบสูตรอาหาร {" "}
            <span>"{FoodName}"</span>
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setDeleteConfirmation(false);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-red"
              onClick={() => {
                DeleteMenu();
              }}
            >
              ยืนยันลบสูตรอาหาร
            </Button>
          </Modal.Footer>
        </Modal>
      <a href={linkwarp} className="link-dark mcard-a-nounderline">
        <div className="flex menu-card">
          <div className="food-image">
            {FoodImg && (
              <img
                src={"https://cookclick.code.in.th/images/".concat(FoodImg)}
                alt="food"
              ></img>
            )}
            {!FoodImg && <TiCamera size={200} />}
          </div>
          <div className="food-details overflowhid">
            <h4>{FoodName}</h4>
            <span className="hint-star star">
              {addStar(1)}
              {addStar(2)}
              {addStar(3)}
              {addStar(4)}
              {addStar(5)}
              {Star != null && (
                <span className="text-muted text-sm"> ({Star.toFixed(1)})</span>
              )}
            </span>
            {Fav != null && (
              <span className="heart text-sm">
                <TiHeartFullOutline /> {Fav}
              </span>
            )}
            <p className="overflowhidp">{Desc}</p>
          </div>
        </div>
      </a>
      <span className="menu-delete">
        <MdDelete className="menu-delete-icon" onClick={() => setDeleteConfirmation(true)}/>
      </span>
    </div>
  );
};

export default MCard;
