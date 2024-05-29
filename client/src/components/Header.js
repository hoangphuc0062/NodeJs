import React from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
function Header() {
  const { HiPhone, MdEmail, BsFillBagFill, IoPersonCircle } = icons;
  return (
    <div className="w-main flex justify-between border h-[100%] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[300px] object-contain " />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center justify-center px-4 border-r">
          <span className="flex gap-4 items-center ">
            <HiPhone />
            <span className="font-semibold"> 077-344-0062</span>
          </span>
          <span>Mon-Sat 9:00 - 20:00</span>
        </div>
        <div className="flex flex-col items-center justify-center px-4 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail />
            <span className="font-semibold"> Support@gmail.com</span>
          </span>
          <span>Online support: 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-4 border">
          <BsFillBagFill />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center px-4 ">
          <IoPersonCircle size={24} />
        </div>
      </div>
    </div>
  );
}

export default Header;
