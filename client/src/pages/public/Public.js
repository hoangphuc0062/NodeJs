import React from "react";
import { Header, Navigation, Footer, TopBar } from "../../components";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopBar />
      <Header />
      <Navigation />
      <div className="w-main ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
