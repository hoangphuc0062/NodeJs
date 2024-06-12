import React, { useState } from "react";
import { Link } from "react-router-dom";

import { sideBarAdmin } from "../../ultils/contants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(1);
  const [subIsActive, setSubIsActive] = useState(null);
  return (
    <aside className=" p-2">
      <ul>
        {sideBarAdmin.map((el) => (
          <li key={el.id}>
            <Link
              to={el.path}
              className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive === el.id ? "bg-semi text-white hover:text-dark" : ""
              }`}
              onClick={() => {
                setIsActive(el.id);
                if (el.dropdown) {
                  setIsOpen(!isOpen);
                }
              }}
            >
              <span className="ms-3">{el.value}</span>
            </Link>
            {el.dropdown && isOpen && (
              <ul className="border-l-2  border-dashed  border-black mx-2">
                {el.dropdown.map((subItem, index) => (
                  <li
                    key={index}
                    className={`p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      subIsActive === index ? "underline-offset-auto" : "" // Sử dụng subIsActive ở đây
                    }`}
                    onClick={() => setSubIsActive(index)} // Cập nhật subIsActive khi click vào subItem
                  >
                    <Link to={subItem.path}>{subItem.value}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
