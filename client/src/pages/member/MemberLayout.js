import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Member/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MemberLayout = () => {
  return (
    <div className="w-main">
      <div className="mt-3 flex gap-3">
        <div className="bg-gray-100 flex flex-col w-[20%] min-h-[300px] flex-grow">
          <Sidebar />
        </div>
        <div className="flex flex-col w-[80%] flex-grow">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MemberLayout;
