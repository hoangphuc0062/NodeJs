import React from "react";
import { useSelector } from "react-redux";

const Address = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div className="bg-white w-[100%] p-4 rounded-lg shadow-md ">
      {current &&
        current.address.map((item, index) => (
          <div className="bg-white p-4 rounded-lg" key={index}>
            Address {index + 1} : {item}
          </div>
        ))}
    </div>
  );
};

export default Address;
