import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
  TiHeartFullOutline,
  TiCamera,
} from "react-icons/ti"

const MCard = ({
  FoodName,
  FoodImg,
  Star,
  Fav,
  Desc,
  MenuID,
  Status,
  UserID,
}) => {
  const addStar = (nowStar) => {
    if (Star == null) {
      return
    }
    nowStar = nowStar - 1
    if (Star - nowStar > 0.8) {
      return <TiStarFullOutline />
    } else if (Star - nowStar > 0.3) {
      return <TiStarHalfOutline />
    } else {
      return <TiStarOutline />
    }
  }
  let linkwarp = ""
  if (Status == null || Status === 3) {
    linkwarp = `menuId/${UserID}/${MenuID}`
  } else if (Status === 2) {
    linkwarp = `menuId/waiting/${UserID}/${MenuID}`
  } else {
    linkwarp = `/add/${UserID}/${MenuID}`
  }

  return (
    <>
    {Status !== 0 && <a href={linkwarp} className="link-dark mcard-a-nounderline">
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
    </a>}
    </>
  )
}

export default MCard
