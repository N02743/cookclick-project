import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
  TiHeartFullOutline,
} from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const MCardTest = (props) => {
  const addStar = (nowStar) => {
    nowStar = nowStar - 1;
    if (props.Star - nowStar > 0.8) {
      return <TiStarFullOutline />;
    } else if (props.Star - nowStar > 0.3) {
      return <TiStarHalfOutline />;
    } else {
      return <TiStarOutline />;
    }
  };

  return (
    <div className="flex mcard">
      <a href={`/MenuId/${props.MenuId}`}>
        <div className="mcard-image">
          <img src={props.FoodImg} alt="food"></img>
        </div>
      </a>
      <div className="food-details">
        <h4>{props.FoodName}</h4>
        <span className="hint-star star">
          {addStar(1)}
          {addStar(2)}
          {addStar(3)}
          {addStar(4)}
          {addStar(5)}
          <span className="text-muted text-sm"> ({props.Star.toFixed(1)})</span>
        </span>
        <span className="heart text-sm">
          <TiHeartFullOutline /> {props.Fav}
        </span>
        <p>{props.Desc}</p>
      </div>
    </div>
  );
};

export default MCardTest;
