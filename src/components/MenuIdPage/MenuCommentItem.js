import React from "react";

const MenuCommentItem = (p) => {
  return (
    <div className="menu-comment-item">
      <div className="menu-comment-left">{p.comment}</div>
      <div className="menu-comment-right">{p.img}</div>
    </div>
  );
};

export default MenuCommentItem;
