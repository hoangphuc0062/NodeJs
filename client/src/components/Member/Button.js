import React, { memo } from "react";

const Button = ({ keyName, icon, onClick, onActive }) => {
  return (
    <button
      className="flex items-center p-3 mb-2 text-white bg-semi rounded-lg"
      onClick={onClick}
      onMouseOver={onActive} // Assuming `onActive` is meant to be triggered on mouse over.
    >
      {icon && React.createElement(icon)}
      {keyName}
    </button>
  );
};

export default memo(Button);
