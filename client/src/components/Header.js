import React from "react";
import logo from "../assets/logo.png";
function Header() {
  return (
    <div className="w-main flex justify-between border h-[100%] py-[35px]">
      <img src={logo} alt="logo" className="w-[300px] h-[100px] " />
      <div>infor</div>
    </div>
  );
}

export default Header;
