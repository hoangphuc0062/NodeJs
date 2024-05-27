import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import { handleToast } from "../../ultils/toast";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const [isRegister, setRegister] = useState(false);

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        handleToast("success", "Register is success");
        setRegister(false);
        resetPayload();
      } else {
        handleToast("error", response.mes);
      }
    } else {
      const rs = await apiLogin(payload);
      rs.success
        ? handleToast("success", "You are login")
        : handleToast("error", rs.mes);
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen">
      <img
        src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnclick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your account ?
              </span>
            )}
            {!isRegister && (
              <span
                onClick={() => {
                  setRegister(true);
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create acount now
              </span>
            )}
            {isRegister && (
              <span
                onClick={() => {
                  setRegister(false);
                }}
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
              >
                Go to login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
