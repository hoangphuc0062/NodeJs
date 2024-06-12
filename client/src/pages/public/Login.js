import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import { handleToast, handleToastPromise } from "../../ultils/toast";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helper";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };
  const [email, setEmail] = useState("");
  const [isRegister, setRegister] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);

  const handelForgotPassword = async () => {
    const response = await handleToastPromise(apiForgotPassword({ email }), {
      pending: "Sending password reset email...",
      success:
        "Password reset email sent, and redirecting to login in 3 seconds !",
      error: "Failed to send password reset email",
    });

    if (response.success) {
      setTimeout(() => {
        setIsForgotPass(false); // Change state to redirect to login page
      }, 3000); // Wait for 3 seconds
    } else {
      handleToast("error", response.mes);
    }
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response.success) {
          handleToast(
            "success",
            "Please check your email to active your account"
          );
          setRegister(false);
          resetPayload();
        } else {
          handleToast("error", response.mes);
        }
      } else {
        const rs = await apiLogin(payload);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              current: rs.userData,
            })
          );
          navigate(`/${path.HOME}`);
        } else {
          handleToast("error", rs.mes);
        }
      }
    } else {
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      {isForgotPass && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-100 flex items-center py-8 z-10 flex flex-col animate-slide-in-top">
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              id="email"
              className="w-[800px] border-b focus:border-gray-400 placeholder:text-sm px-4 py-2"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-center w-full">
              <Button name="Submit" handleOnclick={handelForgotPassword} />
            </div>
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsForgotPass(false)}
            >
              Go back
            </span>
          </div>
        </div>
      )}

      <div className="p-8 bg-white flex flex-col items-center rounded-md w-[500px] border shadow-xl animate-slide-in-top">
        <h1 className="text-[28px] font-semibold text-main mb-8">
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <div className="flex items-center gap-2">
            <InputField
              value={payload.firstname}
              setValue={setPayload}
              nameKey="firstname"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputField
              value={payload.lastname}
              setValue={setPayload}
              nameKey="lastname"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
        )}
        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey="email"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        {isRegister && (
          <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey="mobile"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey="password"
          type="password"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Button
          name={isRegister ? "Register" : "Login"}
          handleOnclick={handleSubmit}
          fw
        />

        <div className="flex items-center justify-between my-2 w-full text-sm">
          {!isRegister && (
            <span
              className="text-blue-500 hover:underline cursor-pointer "
              onClick={() => setIsForgotPass(true)}
            >
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
        <Link to="/" className="text-blue-500 hover:underline cursor-pointer">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
