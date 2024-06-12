import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import getProducts from "../apis/products";
import Product from "./Product";
import Countdown from "./Countdown";

const { FaStar } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const fetchDealDaidy = async () => {
    const response = await getProducts();
    if (response && response.products) {
      const data = response.products.filter(
        (product) => product.type === "Deal Daily"
      );
      if (data) {
        setDealDaily(data[0]);
      }
    } else {
      console.error("No products found in response");
    }
  };

  useEffect(() => {
    fetchDealDaidy();
  }, []);
  useEffect(() => {
    let idInterval = setInterval(() => {
      const now = new Date().getTime();
      const countDownDate = new Date("May 31, 2024 13:20:00").getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        clearInterval(idInterval);
        setHour(0);
        setMinute(0);
        setHour(0);
      } else {
        setHour(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMinute(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSecond(Math.floor((distance % (1000 * 60)) / 1000));
      }
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4 ">
        <span className="flex-3 flex justify-center">
          <FaStar size={20} color="#F1613F" />
        </span>
        <span className="flex-6 text-[20px] flex justify-center">
          DEAL DAILY
        </span>
        <span className="flex-3"></span>
      </div>
      <div className="w-full flex flex-col items-center">
        {!dealDaily ? "Loading..." : <Product productData={dealDaily} />}
        <div className="px-4 py-4 mt-4 flex justify-center gap-2">
          <Countdown unit="Hours" number={hour} />
          <Countdown unit="Minutes" number={minute} />
          <Countdown unit="Seconds" number={second} />
        </div>
      </div>
    </div>
  );
};

export default memo(DealDaily);
