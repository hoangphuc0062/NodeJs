import React, { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[70px] h-[60px] border flex flex-col justify-center items-center bg-gray-200 rounded-lg px-4 mt-4">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(Countdown);
