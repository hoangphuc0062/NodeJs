import React, { useState } from "react";
import { Link } from "react-router-dom";

import { member } from "../../ultils/contants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(1);
  return (
    <aside className=" p-2">
      <ul>
        {member.map((el) => (
          <li key={el.id}>
            <Link
              to={el.path}
              className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive === el.id ? "bg-semi text-white hover:text-dark" : ""
              }`}
              onClick={() => {
                setIsActive(el.id);
              }}
            >
              <span className="ms-3">{el.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default Sidebar;
