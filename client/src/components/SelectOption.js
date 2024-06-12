import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="h-10 w-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-semi hover:text-white animate-slide-top-sm">
      {icon}
    </div>
  );
};

export default SelectOption;
