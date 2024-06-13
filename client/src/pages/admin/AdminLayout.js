import React from "react";
import { Navigation, SideBar } from "../../components/Admin/index";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminLayOut() {
  return (
    <div className="w-full">
      <Navigation />
      <div className="w-full flex">
        <div className="flex flex-col bg-gray-200 flex-grow w-[15%] gap-5 flex-auto">
          <SideBar />
        </div>
        <div className="flex flex-col  flex-grow w-[85%] gap-5 flex-auto ">
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminLayOut;
