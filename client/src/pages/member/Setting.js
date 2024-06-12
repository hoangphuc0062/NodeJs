import React, { useState } from "react";
import { useSelector } from "react-redux";
import { handleToast } from "../../ultils/toast";
import { apiUpdateUser } from "../../apis";
const Setting = () => {
  const { current: reduxCurrent } = useSelector((state) => state.user);
  const [current, setCurrent] = useState(reduxCurrent);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (field, value) => {
    setCurrent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleUpdateInfor = async (event) => {
    event.preventDefault();
    // Add your logic to handle the form submission
    const response = await apiUpdateUser(current);
    if (response.success) {
      handleToast("success", "Update your information");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your logic to handle the form submission

    if (password !== confirmPassword) {
      handleToast("error", "Your password is not matched");
      return;
    }

    const response = await apiUpdateUser(password);
    if (response.success) {
      handleToast("success", "Update your password");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <>
      <form className="bg-white shadow-lg p-2 m-2" onSubmit={handleUpdateInfor}>
        <div>
          <h1 className="text-2xl font-semibold">Account Setting</h1>
        </div>
        <div className="flex justify-between gap-4">
          <div className="mb-4 w-[100%]">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded-md"
              value={current?.firstname}
              onChange={(e) => handleInputChange("firstname", e.target.value)}
            />
          </div>
          <div className="mb-4 w-[100%]">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded-md"
              value={current?.lastname}
              onChange={(e) => handleInputChange("lastname", e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-2 border rounded-md"
            value={current?.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={current?.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white p-2 border rounded-md"
        >
          Save Changes
        </button>
      </form>
      <form className="bg-white shadow-lg p-2 m-2" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>

        <div className="mb-4">
          <label htmlFor="">Password</label>
          <input
            type="text"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="">Confirm password</label>
          <input
            type="text"
            placeholder="Confirm password"
            className="w-full p-2 border rounded-md"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button
          className="bg-black text-white p-2 border rounded-md"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default Setting;
