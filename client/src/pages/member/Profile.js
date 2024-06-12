import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { current, isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      {isLoggedIn && current && (
        <small className=" flex gap-2 text-sm items-center">
          <span>{`Hi , ${
            current?.firstname + " " + current?.lastname
          } if not you`}</span>
          <span
            className="hover:text-semi hover:bg-white 
              p-2 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <span>Logout now</span>
          </span>
        </small>
      )}
    </div>
  );
};

export default Profile;
