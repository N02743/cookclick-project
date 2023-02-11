import React from "react";

const MenuIngItem = (p) => {
  const handleImgIfnotNull = (p) => {
    if (p.img !== undefined) {
      return <img src={p.img} alt={"step" + p.index + "pic"}></img>;
    }
  };
  return (
    <>
      <div className="menu-steps-item">
        <div className="menu-steps-item-desc">
          <div className="menu-steps-index"> ขั้นที่ {p.index}</div>
          {p.desc}
        </div>
        <div className="menu-steps-item-img">{handleImgIfnotNull(p)}</div>
      </div>
    </>
  );
};

export default MenuIngItem;
