import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import path from "../../ultils/path";
import { handleToast } from "../../ultils/toast";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (status === "failed") {
      handleToast("error", "Register is failed");
      navigate(`/${path.LOGIN}`);
    }
    if (status === "success") {
      handleToast("success", "Register is success");
      navigate(`/${path.LOGIN}`);
    }
  }, [status, navigate]);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;
