import React from "react";
import { SideBar, Banner } from "../../components";
const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col w-[25%] gap-5 flex-auto">
        <SideBar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;
