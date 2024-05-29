import React from "react";
import { navigation } from "../ultils/contants";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border text-sm flex items-center">
      {navigation.map((el) => {
        return (
          <NavLink
            key={el.id}
            to={el.path}
            className={({ isActive }) =>
              isActive ? "pr-12 text-main" : "pr-12 text-gray"
            }
          >
            {el.value}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;