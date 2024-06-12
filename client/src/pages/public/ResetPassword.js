import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import logo from "../../assets/logo.png";
import { apiResetPassword } from "../../apis/user";
import { handleToast, handleToastPromise } from "../../ultils/toast";
import path from "../../ultils/path";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await handleToastPromise(
      apiResetPassword({ password, token }),
      {
        pending: "Pending your request to sever",
        success:
          "Your password has been changed, and redirecting to login in 3s",
        error: "Failed to change yourpassword",
      }
    );

    if (response.success) {
      setTimeout(() => {
        navigate(`/${path.LOGIN}`);
      }, 3000); // Wait for 3 seconds
    } else {
      handleToast("error", response.mes);
    }
  };
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-100 flex items-center py-8 z-10 flex flex-col animate-slide-in-top">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="" />
        <label htmlFor="password">Enter your new password</label>
        <input
          type="text"
          id="password"
          className="w-[800px] border-b focus:border-gray-400 placeholder:text-sm px-4 py-2"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-center w-full">
          <Button
            name="Change your password"
            handleOnclick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
