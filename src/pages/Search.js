import { useState } from "react";
import { SearchMenu } from "../script/controller";
import MCard from "../components/MCard";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [menuList, setMenulist] = useState([]);

  const onSearchClick = async (e) => {
    e.preventDefault()
    console.log(keyword);
    let response = await SearchMenu(keyword);
    console.log(response);
    setMenulist(response.menu);
  };

  return (
    <>
      <h1 className="text-center">ค้นหาสูตรอาหารทั้งหมด</h1>
      <div className="normal-search-box">
        <form className="flex justify-content-center normal-search-box"
        onSubmit={(e) => onSearchClick(e)}>
          <input
            className="normal-search-box-input"
            type="text"
            placeholder="ใส่คำที่ต้องการค้นหา"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            id="searchBtn"
            type="submit"
            className="normal-search-box-button"
            onClick={() => onSearchClick()}
          >
            <BsSearch />
            ค้นหา
          </button>
        </form>
      </div>
      <div>
        {menuList.map((eachMenu, index) => (
          <MCard
            key={index}
            FoodName={eachMenu.name}
            FoodImg={eachMenu.image}
            Star={eachMenu.rating}
            Fav={eachMenu.favCount}
            Desc={eachMenu.description}
            MenuID={eachMenu._id}
            UserID={eachMenu.userID}
          ></MCard>
        ))}
      </div>
    </>
  );
};
export default Search;
