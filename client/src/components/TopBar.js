import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { getCurrent } from "../store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "../ultils/icons";
import { logout, clearMessage } from "../store/user/userSlice";
import toast, { handleToast } from "../ultils/toast";
const { IoLogOut } = icons;

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => clearTimeout(setTimeoutId);
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes) {
      handleToast("info", mes);
      dispatch(clearMessage());
      navigate(`/${path.LOGIN}`);
    }
  }, [mes]);
  return (
    <div className="w-full flex justify-center bg-semi">
      <div className="w-main flex justify-between items-center h-[100%] py-[35px] justify-between bg-semi text-white text-[16px] px-3">
        <p className="text-sm">
          Free shipping for standard order over 600.000đ
        </p>
        {isLoggedIn && current ? (
          <small className=" flex gap-2 text-sm items-center">
            <span>{`Hi , ${
              current?.firstname + " " + current?.lastname
            }`}</span>
            <span
              className="hover:text-semi hover:bg-white 
              p-2"
              onClick={() => dispatch(logout())}
            >
              <IoLogOut size={24} />
            </span>
          </small>
        ) : (
          <Link to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
        )}
      </div>
    </div>
  );
};
export default TopBar;
