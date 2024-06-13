import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Login,
  Home,
  Public,
  Products,
  DetailProduct,
  FinalRegister,
  ResetPassword,
  Cart,
  Checkout,
} from "./pages/public";

import {
  AdminLayout,
  ManagerOrders,
  ManagerProducts,
  ManagerUser,
  CreateProducts,
  Dashboard,
  ManagerCategories,
  UpdateProducts,
} from "./pages/admin";

import {
  Address,
  MemberLayout,
  Orders,
  Personal,
  Profile,
  Setting,
} from "./pages/member";

import path from "./ultils/path";
import { getCategories } from "./store/app/asyncAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  });
  return (
    <div className="min-h-screen font-main flex flex-col ">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={`${path.PRODUCTS}/detail-product/:pid`}
            element={<DetailProduct />}
          />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.MEMBER} element={<MemberLayout />}>
            <Route path={path.PROFILE} element={<Profile />} />
            <Route path={path.ADDRESS} element={<Address />} />
            <Route path={path.ORDERS} element={<Orders />} />
            <Route path={path.SETTING} element={<Setting />} />
          </Route>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGER_USER} element={<ManagerUser />} />
          <Route
            path={path.MANAGER_CATEGORIES}
            element={<ManagerCategories />}
          />
          <Route path={path.MANAGER_ORDERS} element={<ManagerOrders />} />
          <Route path={path.MANAGER_PRODUCTS} element={<ManagerProducts />} />
          <Route
            path={`${path.MANAGER_PRODUCTS}/create`}
            element={<CreateProducts />}
          />
          <Route
            path={`${path.MANAGER_PRODUCTS}/edit/:_id`}
            element={<UpdateProducts />}
          />
        </Route>

        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>
      <ToastContainer stacked />
    </div>
  );
}

export default App;
