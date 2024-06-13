import React, { useEffect, useState } from "react";
import { handleToast } from "../../ultils/toast";

import {
  apiAddUser,
  apiDeleteUser,
  apiGetAllUsers,
  apiUpdateUserByAdmin,
} from "../../apis/user";
import Button from "../../components/Button";
import icon from "../../ultils/icons";

const { FaEye, FaTrash, GrUpdate } = icon;

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firtname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    isBlocked: false,
  });
  const resetPayload = () => {
    setPayload({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
      role: "",
    });
  };

  const getAllUsers = async () => {
    const response = await apiGetAllUsers();
    setUsers(response.users);
  };
  const handleAdd = async () => {
    const response = await apiAddUser(payload);

    if (response.success) {
      handleToast("success", response.mes);
      resetPayload();
      setIsAdd(false);
      getAllUsers();
    } else {
      handleToast("error", response.mes);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
      const response = await apiDeleteUser(_id);
      if (response.success) {
        handleToast("success", response.mes);
        getAllUsers();
      } else {
        handleToast("error", response.mes);
      }
    } else {
      handleToast("info", "Deletion cancelled.");
    }
  };
  const handleUserClick = (_id) => {
    setNewUser(_id);
    setIsUpdate(true);
  };

  const handleUpdate = async (user) => {
    const { _id, firstname, lastname, mobile, role, email } = user;

    const data = {
      firstname,
      lastname,
      mobile,
      role,
      email,
    };

    const response = await apiUpdateUserByAdmin(_id, data);

    if (response.success === true) {
      handleToast("success", response.mes);
      setIsUpdate(false);
      getAllUsers();
    } else {
      handleToast("error", response.mes);
    }
  };
  // const handleUpdateBlocked = async (newUser, isBlocked) => {
  //   const { _id, isBlocked } = newUser;

  //   const data = {
  //     isBlocked: true, // add blocked status to the data
  //   };

  //   const response = await apiUpdateUserByAdmin(_id, data);

  //   if (response.success) {
  //     setIsUpdate(false);
  //     handleToast("success", response.mes);
  //     getAllUsers();
  //   } else {
  //     handleToast("error", response.mes);
  //   }
  // };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div class="relative h-screen p-2">
      <Button name="Add a new users" handleOnclick={() => setIsAdd(true)} />

      {isAdd && (
        <div
          class="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
          onClick={() => setIsAdd(false)}
        >
          <div
            class="absolute w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 class="text-2xl font-semibold text-center">Add new user</h1>
            <form class="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="First Name"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.firstname}
                onChange={(e) =>
                  setPayload({ ...payload, firstname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.lastname}
                onChange={(e) =>
                  setPayload({ ...payload, lastname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Email"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Password"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.password}
                onChange={(e) =>
                  setPayload({ ...payload, password: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Mobile"
                class="p-2 border border-gray-200 rounded-md"
                value={payload.mobile}
                onChange={(e) =>
                  setPayload({ ...payload, mobile: e.target.value })
                }
              />
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a role
              </label>
              <select
                value={payload.role}
                onChange={(e) =>
                  setPayload({ ...payload, role: e.target.value })
                }
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a role</option>
                <option value="0">Admin</option>
                <option value="1">User</option>
              </select>

              <Button
                name="Add User "
                handleOnclick={() => handleAdd(newUser)}
              />
            </form>
          </div>
        </div>
      )}
      {isUpdate && (
        <div
          class="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50"
          onClick={() => setIsUpdate(false)}
        >
          <div
            class="absolute w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 class="text-2xl font-semibold text-center">Add new user</h1>
            <form class="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="First Name"
                class="p-2 border border-gray-200 rounded-md"
                value={newUser.firstname}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                class="p-2 border border-gray-200 rounded-md"
                value={newUser.lastname}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Email"
                class="p-2 border border-gray-200 rounded-md"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Password"
                class="p-2 border border-gray-200 rounded-md"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Mobile"
                class="p-2 border border-gray-200 rounded-md"
                value={newUser.mobile}
                onChange={(e) =>
                  setNewUser({ ...newUser, mobile: e.target.value })
                }
              />
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a role</option>
                <option value="0">Admin</option>
                <option value="1">User</option>
              </select>

              <Button
                name="Update User "
                handleOnclick={() => handleUpdate(newUser)}
              />
            </form>
          </div>
        </div>
      )}
      <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              First Name
            </th>
            <th scope="col" class="px-6 py-3">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Mobile
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.firstname}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.lastname}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.email}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.mobile}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {user?.role === "0" ? "Admin" : "User"}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <select
                  // value={newUser.isBlocked}
                  // onChange={(e) => handleUpdateBlocked(newUser, e.target.value)}
                  id="blocked"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>
                    {user?.isBlocked === false ? "Active" : "Blocked"}
                  </option>
                  <option value="true">Blocked</option>
                  <option value="false">Active</option>
                </select>
              </th>

              <th scope="row" class="flex gap-4 px-6 py-4">
                <span className="p-3 cursor-pointer">
                  <FaEye />
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrash />
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <GrUpdate />
                </span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerUser;
