import { useEffect, useState, useRef } from "react";
import "./MenuId.css";
import MenuIngItem from "../components/MenuIdPage/MenuIngItem.js";
import MenuStepsItem from "../components/MenuIdPage/MenuStepsItem.js";
import {
  GetCurrentMenuIfFavorited,
  GetMenuInfo,
  GetMyRatingOnMenu,
  GetSystemIngredient,
  GetSystemKitchenware,
  MenuEdit,
  RatingMenu,
  UnfavoriteMenu,
  FavoriteMenu,
  AddMenuComment,
  DelComment,
  DelMyComment,
  CommentReport,
  MenuReport,
  GetAllMeIngredient,
  GetAllMeKitware,
  DecreaseMyIngredient,
  MemberReport,
} from "../script/controller";
import { useNavigate, useParams } from "react-router-dom";
import { BiFlag, BiNotepad } from "react-icons/bi";
import {
  BsPersonCircle,
  BsFillStarFill,
  BsFillBookmarksFill,
  BsBookmarkPlus,
  BsBookmarkStarFill,
} from "react-icons/bs";
import { MdOutlineDescription, MdDelete } from "react-icons/md";
import { Form, Card } from "react-bootstrap";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { Modal, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { AiOutlineComment } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ImCross, ImCheckmark } from "react-icons/im";

const MenuPage = ({ status }) => {
  const Navigate = useNavigate();

  const [menuDetails, setMenuDetails] = useState({
    _id: "",
    name: "",
    image: "",
    description: "",
    ingredient: [],
    kitchenware: [],
    cookingstep: [],
    comment: [],
  });
  const [MenuDoable, setMenuDoable] = useState(false);
  const [wareDoable, setWareDoable] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [cookingIng, setCookingIng] = useState([]);
  const [ingDummy, setIngDummy] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [IngRefData, setIngRefData] = useState([]);

  const FetchData = async () => {
    const ingFullData = await GetSystemIngredient();
    const wareFullData = await GetSystemKitchenware();
    let myRating, ifFavorited, myRefIng, myWareIng;
    if (token) {
      myRating = await GetMyRatingOnMenu(token, mid);
      ifFavorited = await GetCurrentMenuIfFavorited(token, mid);
      myRefIng = await GetAllMeIngredient(token);
      myWareIng = await GetAllMeKitware(token);
      setMenuFavorite(ifFavorited.result);
      setIngRefData(myRefIng.ingredient);
      if (!IgnoreInitialFavorite) {
        setInitialFavorite(ifFavorited.result);
        setIgnoreInitialFavorite(true);
      }
      setCurrentStarValue(myRating.ratescore);
    }
    let menuInfo;
    if (!status) {
      menuInfo = await GetMenuInfo(mid);
    } else {
      menuInfo = await MenuEdit(token, mid);
    }
    console.log(menuInfo);
    menuInfo.query[0].image = "https://cookclick.code.in.th/images/".concat(
      menuInfo.query[0].image
    );
    for (let i = 0; i < menuInfo.query[0].cookingstep.length; i++) {
      if (menuInfo.query[0].cookingstep[i].image) {
        menuInfo.query[0].cookingstep[i].image =
          "https://cookclick.code.in.th/images/".concat(
            menuInfo.query[0].cookingstep[i].image
          );
      }
    }
    setMenuDetails(menuInfo.query[0]);
    const menuIngredients = menuInfo.query[0].ingredient.map((ing) => ({
      ...ingFullData.data.find((ingFull) => ingFull._id === ing.ingredientID),
      amount: ing.amount,
    }));

    const menuKitchenware = menuInfo.query[0].kitchenware.map((ware) => ({
      ...wareFullData.data.find(
        (wareFull) => wareFull._id === ware.kitchenwareID
      ),
    }));
    // console.log(menuInfo.query[0]);
    setMenuDetails((prev) => ({
      ...prev,
      rating: prev.rating.toFixed(2),
      ingredient: menuIngredients,
      kitchenware: menuKitchenware,
    }));
    ingFullData.data.forEach((element, i) => {
      element.id = i;
      element.amount = 0;
    });
    wareFullData.data.forEach((element, i) => {
      element.id = i;
    });
    // console.log(menuInfo);
    checkIfMenuDoable(menuInfo.query[0], myRefIng, myWareIng);

    CheckNotEnoughIng(menuIngredients, myRefIng.ingredient);
  };

  const checkIfMenuDoable = (menuInfo, myRefIng, myRefWare) => {
    let IngSatisfied = false;
    let WareSatisfied = false;
    menuInfo.ingredient.forEach((menuIng) => {
      let count = 0;
      myRefIng.ingredient.forEach((myIng) => {
        if (
          menuIng.ingredientID === myIng.ingredientID &&
          myIng.amount >= menuIng.amount
        ) {
          count++;
        }
      });
      if (count === menuInfo.ingredient.length) {
        IngSatisfied = true;
      }
    });
    menuInfo.kitchenware.forEach((menuWare) => {
      let count = 0;
      myRefWare.kitchenware.forEach((myWare) => {
        if (menuWare.kitchenwareID === myWare.kitchenwareID) {
          count++;
        }
      });
      if (count === menuInfo.kitchenware.length) {
        WareSatisfied = true;
      }
    });
    if (IngSatisfied && WareSatisfied) {
      setMenuDoable(true);
    }
    if (WareSatisfied) {
      setWareDoable(true);
    }
    if (menuInfo.kitchenware.length === 0){
      setWareDoable(true);
    }
  };

  const { mid } = useParams();
  const [ignore, setIgnore] = useState(false);

  useEffect(() => {
    if (ignore) return;
    setIgnore(true);
    FetchData();
  }, []);

  const sendReport = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
  };

  const CheckIngAmountInRef = (eachIng) => {
    let correspondIng = IngRefData.filter(
      (refIng) => eachIng._id === refIng.ingredientID
    );
    if (correspondIng.length === 0) {
      return 0;
    } else return correspondIng[0].amount;
  };

  const [notEnoughIng, setNotEnoughIng] = useState([]);

  const CheckNotEnoughIng = (menu, ref) => {
    let notEnoughIngArray = [];
    menu.forEach((eachMenuIng) => {
      let dupe = false;
      notEnoughIngArray.forEach((notEnough) => {
        if (eachMenuIng._id === notEnough.ingredientID) {
          dupe = true;
        }
      });
      let found = false;
      if (!dupe) {
        ref.forEach((refIng) => {
          if (refIng.ingredientID === eachMenuIng._id) {
            found = true;
            if (refIng.amount < eachMenuIng.amount) {
              let newEntry = {
                ingredientID: eachMenuIng._id,
                ingredientName: eachMenuIng.name,
                missingAmount: eachMenuIng.amount - refIng.amount,
                ingredientUnit: eachMenuIng.unit,
                AmountinRef: refIng.amount,
              };
              console.log(newEntry);
              if (newEntry.missingAmount > 0) {
                notEnoughIngArray.push(newEntry);
              }
            }
          }
        });
      }
      if (!found) {
        let newEntry = {
          ingredientID: eachMenuIng._id,
          ingredientName: eachMenuIng.name,
          missingAmount: eachMenuIng.amount,
          ingredientUnit: eachMenuIng.unit,
        };
        if (newEntry.missingAmount > 0) {
          notEnoughIngArray.push(newEntry);
        }
      }
    });

    setNotEnoughIng(notEnoughIngArray);
    return;
  };

  const [myComment, setMyComment] = useState("");

  function commentBox(props) {
    return (
      <div className="comment-box">
        <Form.Group className="mb-3" controlId="AddDesc">
          <Form.Control
            type="text"
            placeholder="แสดงความคิดเห็นของคุณ"
            as="textarea"
            onChange={(e) => setMyComment(e.target.value)}
            value={myComment}
          />
        </Form.Group>
        <div className="comment-box-button-box">
          <button
            style={{ display: myComment ? "block" : "none" }}
            className="comment-box-button"
            onClick={() => setMyComment("")}
          >
            {" "}
            ยกเลิก{" "}
          </button>
          <button
            style={{ display: myComment ? "block" : "none" }}
            className="comment-box-button"
            onClick={() => handleComment()}
          >
            {" "}
            เพิ่มคอมเมนต์{" "}
          </button>
        </div>
      </div>
    );
  }

  const handleComment = async () => {
    const response = await AddMenuComment(
      token,
      { description: myComment },
      mid
    );
    setMyComment("");
    FetchData();
  };
  const [currentStarValue, setCurrentStarValue] = useState(0);
  const [hoverStarValue, setHoverStarValue] = useState(0);
  const [menuFavorite, setMenuFavorite] = useState(false);
  const [rateSuccessMsg, setRateSuccessMsg] = useState(false);
  const [initialFavorite, setInitialFavorite] = useState(0);
  const [showFavoritemsg, setShowFavoritemsg] = useState(false);
  const [showUnfavoritemsg, setShowUnfavoritemsg] = useState(false);
  const [commentDeleteConf, setShowCommentDeleteConf] = useState(false);
  const [currentCommentForDelete, setCurrentCommentForDelete] = useState("");
  const [IgnoreInitialFavorite, setIgnoreInitialFavorite] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [commentReportId, setCommentReportId] = useState("");
  const [showMenuReportModal, setShowMenuReportModal] = useState(false);
  const [MenuReportContent, setMenuReportContent] = useState("");
  const [showCookingFinal, setShowCookingFinal] = useState("");
  const [previewAmountChange, setPreviewAmountChange] = useState(false);
  const comBox = commentBox();

  const [showCookingModal, setShowCookingModal] = useState("");

  const handleRatingClick = async (value) => {
    setCurrentStarValue(value);
    let valueBody = {
      score: value,
    };
    const response = await RatingMenu(token, valueBody, mid);
    // console.log(response);
    setRateSuccessMsg(true);
    FetchData();
  };

  const handleSendReport = async () => {
    setReportContent("");
    setShowReportModal(false);
    const response = await CommentReport(
      token,
      { description: reportContent },
      mid,
      commentReportId
    );
    console.log(response);
  };

  const handleFavoriteClick = async () => {
    if (menuFavorite === false) {
      const response = await FavoriteMenu(token, mid);
      setMenuFavorite(true);
      // console.log(response);
    } else {
      const response = await UnfavoriteMenu(token, mid);
      setMenuFavorite(false);
      // console.log(response);
    }
    if (initialFavorite) {
      console.log(initialFavorite);
      setShowUnfavoritemsg(!showUnfavoritemsg);
    } else {
      console.log(initialFavorite);
      setShowFavoritemsg(!showFavoritemsg);
    }
    FetchData();
  };

  const handleRemoveComment = async () => {
    const response = await DelMyComment(token, mid, currentCommentForDelete);
    console.log(response);
    setShowCommentDeleteConf(false);
    FetchData();
  };

  const handleReportMenu = async () => {
    const response = await MenuReport(
      token,
      { description: MenuReportContent },
      mid
    );
    console.log(response);
    setShowMenuReportModal(false);
  };

  const handleCookingFinal = async () => {
    // setShowCookingFinal(false)
    cookingIng.forEach((eachUsedIng) => {
      let deleteValue = 0;
      if (eachUsedIng.amount < CheckIngAmountInRef(eachUsedIng)) {
        deleteValue = eachUsedIng.amount;
      } else if (eachUsedIng.amount >= CheckIngAmountInRef(eachUsedIng)) {
        deleteValue = CheckIngAmountInRef(eachUsedIng);
      }
      // console.log(deleteValue);
      // console.log(eachUsedIng._id);
      const deleteMyIngredient = async () => {
        if (deleteValue > 0) {
          let ingForDecrease = {
            ingredient: [
              {
                ingredientID: eachUsedIng._id,
                amount: deleteValue,
              },
            ],
          };
          const response = await DecreaseMyIngredient(token, ingForDecrease);
          console.log(response);
        }
      };
      deleteMyIngredient();
    });
    setPreviewAmountChange(false);
    setCooking((prev) => !prev);
    FetchData();
  };

  const [userReport, setUserReport] = useState({});
  const reportRef = useRef("");

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Report {userReport.displayname}?</Popover.Header>
      <Popover.Body>
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            if (reportRef.current.value) {
              const response = await MemberReport(
                token,
                { description: reportRef.current.value },
                userReport.userID
              );
              if (response.success) {
                alert("Reported Successfully");
              } else {
                alert("Error: Cannot report");
              }
            } else {
              alert("Please fill the report reason");
            }
          }}
        >
          <Form.Group className="mb-3" controlId="ReportDesc">
            <Form.Label>รายละเอียด</Form.Label>
            <Form.Control ref={reportRef} as="textarea" rows={3} />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      {cooking && (
        <div className="menu-cooking">
          <h1 className="menu-cooking-text">Cooking in progress</h1>
          <div className="menu-do-this">
            <button
              className="button-28-red do-this-mw"
              onClick={() => {
                setCooking((prev) => !prev);
              }}
            >
              ยกเลิกการทำอาหาร <br />
              <ImCross />
            </button>
            <button
              className="button-28-blue do-this-mw"
              onClick={() => setShowCookingModal(true)}
            >
              บันทึกวัตถุดิบที่ได้ใช้ไป <br />
              <BiNotepad />
            </button>
            <button
              className="button-28-green do-this-mw"
              onClick={() => setShowCookingFinal(true)}
            >
              {" "}
              ทำอาหารเสร็จสิ้น <br />
              <ImCheckmark />
            </button>
          </div>
        </div>
      )}
      <div className="menupage">
        <div className="menu-img">
          <img src={menuDetails.image} alt="main-pic"></img>
        </div>
        <div className="menu-desc">
          <h1 className="menu-header">{menuDetails.name}</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <BsPersonCircle /> By : {menuDetails.userDisplayName}
            </div>
            {token && (
              <BiFlag
                className="menu-report-menu"
                onClick={() => setShowMenuReportModal(true)}
              />
            )}
          </div>
          <div style={{ height: "auto" }}>
            <MdOutlineDescription /> {menuDetails.description}
          </div>
          <div>
            <BsFillStarFill /> Rating : {menuDetails.rating}/5 -{" "}
            <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
              {" "}
              rated by {menuDetails.ratingWeight} peoples
            </span>
          </div>
          <div>
            <BsFillBookmarksFill /> Favorites : {menuDetails.favCount}
          </div>
        </div>

        <div
          className="menu-rating-bar"
          style={{ display: token ? "flex" : "none" }}
        >
          <div className="menu-rating-rate px-1">
            Rate
            <div className="menu-rating-star">
              {[...Array(5)].map((star, starValue) => {
                const ratingValue = starValue + 1;
                return (
                  <>
                    <label
                      style={{
                        display:
                          ratingValue > (hoverStarValue || currentStarValue)
                            ? "none"
                            : "block",
                      }}
                    >
                      <input
                        type="radio"
                        style={{ display: "none" }}
                        value={ratingValue}
                        onClick={() => handleRatingClick(ratingValue)}
                      />
                      <TiStarFullOutline
                        className="menu-star"
                        onMouseOver={() => setHoverStarValue(ratingValue)}
                        onMouseLeave={() => setHoverStarValue(0)}
                      />
                    </label>
                    <label
                      style={{
                        display:
                          ratingValue > (hoverStarValue || currentStarValue)
                            ? "block"
                            : "none",
                      }}
                    >
                      <input
                        type="radio"
                        style={{ display: "none" }}
                        value={ratingValue}
                        onClick={() => handleRatingClick(ratingValue)}
                      />
                      <TiStarOutline
                        className="menu-star"
                        onMouseOver={() => setHoverStarValue(ratingValue)}
                        onMouseLeave={() => setHoverStarValue(0)}
                      />
                    </label>
                  </>
                );
              })}
            </div>
            <span
              style={{
                display: rateSuccessMsg ? "block" : "none",
                fontSize: "70%",
              }}
            >
              {" "}
              คุณได้ให้ {currentStarValue} ดาวกับเมนูนี้!
            </span>
          </div>
          <div className="menu-rating-comment px-1">
            Comment
            <div>
              <a href="#comment-section">
                <AiOutlineComment
                  style={{
                    fontSize: "180%",
                    cursor: "pointer",
                    color: "black",
                  }}
                  href="comment-section"
                />
              </a>
            </div>
          </div>
          <div className="menu-rating-fav px-1">
            Favorite
            <div className="flex justify-content-center">
              <BsBookmarkPlus
                style={{
                  fontSize: "150%",
                  cursor: "pointer",
                  display: menuFavorite ? "none" : "block",
                  color: "green",
                }}
                onClick={() => handleFavoriteClick()}
              />
              <BsBookmarkStarFill
                style={{
                  fontSize: "150%",
                  cursor: "pointer",
                  display: menuFavorite ? "block" : "none",
                  color: "green",
                }}
                onClick={() => handleFavoriteClick()}
              />
            </div>
            <span
              style={{
                display: showFavoritemsg ? "block" : "none",
                fontSize: "70%",
              }}
            >
              นำเข้ารายการโปรดแล้ว
            </span>
            <span
              style={{
                display: showUnfavoritemsg ? "block" : "none",
                fontSize: "70%",
              }}
            >
              นำออกจากรายการโปรดแล้ว
            </span>
          </div>
        </div>
        {token && !cooking && (
          <div className="menu-do-this-menu">
            {wareDoable && (
              <span className="green">คุณมีอุปกรณ์พร้อมสำหรับอาหารจานนี้ </span>
            )}
            {!wareDoable && (
              <span className="missing-ingredient-text2">
                คุณไม่มีอุปกรณ์ที่จะทำอาหารจานนี้
              </span>
            )}
            {notEnoughIng.length === 0 && (
              <span className="green">
                {" "}
                คุณมีวัตถุดิบพร้อมสำหรับอาหารจานนี้{" "}
              </span>
            )}
            {notEnoughIng.length > 0 && (
              <span className="missing-ingredient-text2">
                {" "}
                คุณขาดวัตถุดิบในการทำดังนี้{" "}
              </span>
            )}
            <div className="missing-ingredient">
              {notEnoughIng.map((eachMissing) => (
                <li className="missing-ingredient-text">
                  {" "}
                  ขาด {eachMissing.ingredientName} {eachMissing.missingAmount}{" "}
                  {eachMissing.ingredientUnit}{" "}
                  {(eachMissing.AmountinRef > 0) &&
                    <span className="amount-in-ref">
                      (ในตู้เย็นมีอยู่ {eachMissing.AmountinRef})
                    </span>
                  }
                </li>
              ))}
            </div>
            {wareDoable && !cooking && (
              <button
                className="do-this-menu-button"
                onClick={() => {
                  setCooking((prev) => !prev);
                  setCookingIng(
                    JSON.parse(JSON.stringify(menuDetails.ingredient))
                  );
                }}
              >
                ทำอาหารจานนี้เลย!
              </button>
            )}
          </div>
        )}

        <div className="menu-ing-list">
          <h4>ส่วนผสม</h4>
          {menuDetails.ingredient.map((eachIng, index) => (
            <div key={index}>
              <MenuIngItem
                index={index}
                name={eachIng.name}
                amount={eachIng.amount}
                unit={eachIng.unit}
              />
            </div>
          ))}
          <h4 className="pt-4">อุปกรณ์</h4>
          {menuDetails.kitchenware.map((eachWare, index) => (
            <div key={index}>
              <MenuIngItem name={eachWare.name} index={index} />
            </div>
          ))}
        </div>
        <div className="menu-steps-list">
          <div className="menu-steps-head">
            <h1>ขั้นตอนการทำ</h1>
          </div>
          {menuDetails.cookingstep.map((eachSteps, id) => (
            <MenuStepsItem
              img={eachSteps.image}
              desc={eachSteps.description}
              index={id + 1}
              key={id}
            />
          ))}
        </div>
        <h1 className="mt-5" id="comment-section">
          Comments
        </h1>
        {token && comBox}
        {menuDetails.comment
          .filter((eachItem) => eachItem.status !== false)
          .map((eachComment, id) => (
            <div className="menu-comments-list" key={id}>
              <div className="flex justify-content-between text-md">
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={popover}
                >
                  <span
                    className="menu-comment-username hover-pointer"
                    onClick={() => setUserReport(eachComment)}
                  >
                    <BsPersonCircle style={{ fontSize: "150%" }} />
                    &nbsp;
                    {eachComment.displayname} &nbsp;{" "}
                    <span
                      style={{
                        display:
                          userId === eachComment.userID ? "block" : "none",
                      }}
                    >
                      (You)
                    </span>
                  </span>
                </OverlayTrigger>
                <div className="flex">
                  <MdDelete
                    className="delete-icon"
                    style={{
                      display: userId === eachComment.userID ? "block" : "none",
                    }}
                    onClick={() => {
                      setShowCommentDeleteConf(true);
                      setCurrentCommentForDelete(eachComment.commentID);
                    }}
                  />
                  {token && (
                    <BiFlag
                      className="report-icon"
                      style={{
                        display:
                          userId === eachComment.userID ? "none" : "block",
                      }}
                      onClick={() => {
                        setShowReportModal(true);
                        setCommentReportId(eachComment.commentID);
                      }}
                    />
                  )}
                </div>
              </div>
              <p>{eachComment.description}</p>
            </div>
          ))}
        <Modal
          show={commentDeleteConf}
          onHide={() => setShowCommentDeleteConf(false)}
        >
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            ยืนยันลบคอมเมนต์นี้หรือไม่
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setShowCommentDeleteConf(false);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-red"
              onClick={() => {
                handleRemoveComment();
              }}
            >
              ยืนยันลบคอมเมนต์
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            <input
              className="report-form-modal"
              onChange={(e) => setReportContent(e.target.value)}
              value={reportContent}
              placeholder="กรอกสาเหตุการรายงาน"
            />
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setShowReportModal(false);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-red"
              onClick={() => {
                handleSendReport();
              }}
            >
              ยืนยันรายงาน
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showMenuReportModal}
          onHide={() => setShowMenuReportModal(false)}
        >
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            <input
              className="report-form-modal"
              onChange={(e) => setMenuReportContent(e.target.value)}
              value={MenuReportContent}
              placeholder="กรอกสาเหตุการรายงาน"
            />
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setShowMenuReportModal(false);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-red"
              onClick={() => {
                handleReportMenu(MenuReportContent);
              }}
            >
              ยืนยันรายงาน
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showCookingModal}
          onHide={() => setShowCookingModal(false)}
        >
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            <span>บันทึกวัตถุดิบที่ใช้ไป</span>
            {cookingIng.map((eachIng) => (
              <div className="menu-ing-modal">
                <div className="ref-ing-item">
                  <Card className="ref-ing-name">
                    <Card.Body>{eachIng.name}</Card.Body>
                  </Card>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="ปริมาณ"
                    className="ref-ing-amount"
                    onChange={(e) => {
                      eachIng.amount = e.target.value;
                      setIngDummy((dummy) => !dummy);
                    }}
                    value={eachIng.amount}
                  />
                  <Card className="ref-ing-unit">
                    <Card.Body>{eachIng.unit}</Card.Body>
                  </Card>
                </div>
                <span className="cooking-modal-text">
                  {" "}
                  ( ในตู้เย็นมีอยู่ {CheckIngAmountInRef(eachIng)}{" "}
                  {eachIng.unit} )
                </span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-green"
              onClick={() => {
                setShowCookingModal(false);
              }}
            >
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showCookingFinal}
          onHide={() => setShowCookingFinal(false)}
        >
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            <span>
              โปรดตรวจสอบวัตถุดิบที่คุณได้ใช้ไป
              <br />
              ให้ครบถ้วน
            </span>
            {cookingIng.map((eachIng) => (
              <div className="menu-ing-modal">
                <div className="ref-ing-item">
                  <Card className="ref-ing-name">
                    <Card.Body>{eachIng.name}</Card.Body>
                  </Card>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="ปริมาณ"
                    className="ref-ing-amount"
                    onChange={(e) => {
                      eachIng.amount = e.target.value;
                      setIngDummy((dummy) => !dummy);
                    }}
                    value={eachIng.amount}
                  />
                  <Card className="ref-ing-unit">
                    <Card.Body>{eachIng.unit}</Card.Body>
                  </Card>
                </div>
                <span className="cooking-modal-text">
                  {" "}
                  ( ในตู้เย็นมีอยู่ {CheckIngAmountInRef(eachIng)}{" "}
                  {eachIng.unit} )
                </span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setShowCookingFinal(false);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-green"
              onClick={() => {
                setPreviewAmountChange(true);
                setShowCookingFinal(false);
              }}
            >
              ต่อไป
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={previewAmountChange}
          onHide={() => setPreviewAmountChange(false)}
        >
          <Modal.Body className="text-center" style={{ fontSize: "28px" }}>
            <div>
              <span>วัตถุดิบในตู้เย็นของคุณจะมีการเปลี่ยนแปลงดังนี้</span>
            </div>
            {cookingIng.map((eachIng) => (
              <div className="preview-change-text">
                <span> {eachIng.name} </span>
                <span>
                  {" "}
                  {CheckIngAmountInRef(eachIng)} <FaLongArrowAltRight />{" "}
                  {Math.max(0, CheckIngAmountInRef(eachIng) - eachIng.amount)}{" "}
                </span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="content-center">
            <Button
              className="button-28-blue"
              onClick={() => {
                setPreviewAmountChange(false);
                setShowCookingFinal(true);
              }}
            >
              กลับ
            </Button>
            <Button
              className="button-28-green"
              onClick={() => {
                handleCookingFinal();
              }}
            >
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MenuPage;
