import React, { useState } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full flex flex-col relative">
      {value.trim() !== "" && (
        <label
          className="text-[10px] animate-slide-top-sm absolute top-0 left-[8px] "
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full my-2 place-holder:text-sm placeholder:italic outline-none"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => {
          setInvalidFields([]);
        }}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-500 text-[12px]">
          {invalidFields.find((el) => el.name === nameKey)?.mes}{" "}
        </small>
      )}
    </div>
  );
};

export default InputField;
