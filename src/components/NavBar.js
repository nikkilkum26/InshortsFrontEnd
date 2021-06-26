import React, { useContext } from "react";
import "./NavBar.css";
import SideBar from "./SideBar";
import { InshortsContext } from "../Routes";
import { PATH, PRODUCT_URL } from "../constants";

const NavBar = (props) => {
  const { dispatch } = useContext(InshortsContext);

  const handleClick = () => {
    fetch(`${PRODUCT_URL}${PATH.ARTICLES}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        dispatch({
          type: "NEWS",
          payload: Array.prototype.reverse.call(result),
        });
      });
  };

  return (
    <div className="navbar">
      <div className="navbar__icon">
        <SideBar />
      </div>
      <img
        className="logo"
        src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
        alt="logo"
        onClick={() => handleClick()}
      />
    </div>
  );
};

export default NavBar;
