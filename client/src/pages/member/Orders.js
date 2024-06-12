import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  return <div>Orders</div>;
};

export default Orders;
