import React from "react";
// import { useSelector } from "react-redux";
import { SideBar, Banner, BestSeller, DealDaily } from "../../components";

const Home = () => {
  // const { categories } = useSelector((state) => state.app);
  // const { isLoggedIn, current } = useSelector((state) => state.user);
  return (
    <div className="w-main flex">
      <div className="flex flex-col w-[25%] gap-5 flex-auto">
        <SideBar />
        <DealDaily />
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
        <Banner />
        <BestSeller />
      </div>
    </div>
  );
};

export default Home;
