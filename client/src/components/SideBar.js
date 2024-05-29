import React, { useState, useEffect } from "react";
import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const response = await apiGetCategories();

    setCategories(response.categories);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col">
      {categories?.map((category) => (
        <NavLink
          key={category.id}
          to={category.slug}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-while px-5 pt-[15px] pb[14px] text-sm"
              : "px-5 pt-[15px] pb[14px] text-sm"
          }
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
