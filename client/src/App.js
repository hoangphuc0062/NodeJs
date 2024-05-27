import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "./pages/public";
import {
  AdminLayout,
  ManagerOrders,
  ManagerProducts,
  ManagerUser,
  CreateProducts,
  Dashboard,
} from "./pages/admin";
import { MemberLayout, Personal } from "./pages/member";
import path from "./ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGER_USER} element={<ManagerUser />} />
          <Route path={path.MANAGER_PRODUCTS} element={<ManagerProducts />} />
          <Route path={path.MANAGER_ORDERS} element={<ManagerOrders />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PESONAL} element={<Personal />} />
        </Route>
      </Routes>
      <ToastContainer stacked />
    </div>
  );
}

export default App;
