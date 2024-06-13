import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/users/register",
    data: data,
    method: "post",
    withCredentials: true,
  });
export const apiLogin = (data) => {
  return axios({
    url: "/users/login",
    data: data,
    method: "post",
  });
};

export const apiForgotPassword = (data) => {
  return axios({
    url: "/users/forgotpassword",
    data: data,
    method: "post",
  });
};
export const apiResetPassword = (data) => {
  return axios({
    url: "/users/resetpassword",
    data,
    method: "put",
  });
};
export const apiGetCurrent = () => {
  return axios({
    url: "/users/current",
    method: "get",
  });
};

export const apiGetAllUsers = () => {
  return axios({
    url: "/users",
    method: "get",
  });
};
export const apiAddUser = (data) => {
  return axios({
    url: "/users/create",
    method: "post",
    data: data,
  });
};
export const apiDeleteUser = (_id) => {
  return axios({
    url: `/users/${_id}`,
    method: "delete",
  });
};
export const apiUpdateUserByAdmin = (_id, data) => {
  return axios({
    url: `/users/${_id}`,
    method: "put",
    data: data,
  });
};

export const apiUpdateCart = (_id, data) => {
  return axios({
    url: `/users/cart`,
    method: "put",
    data,
  });
};
export const apiUpdateQuantity = (pid, quantity) => {
  return axios({
    url: `/users/cartquanity`,
    method: "put",
    data: { pid, quantity },
  });
};
export const apiRemoveItem = (_id, pid) => {
  return axios({
    url: `/users/remove`,
    method: "delete",
    data: {
      _id,
      pid,
    },
  });
};

export const apiCreateOrder = (data) => {
  return axios({
    url: "/orders",
    method: "post",
    data,
  });
};

export const apiGetOrderByAdmin = () => {
  return axios({
    url: "/orders",
    method: "get",
  });
};

export const apiUpdateUser = (user) => {
  return axios({
    url: "/users/current",
    method: "put",
    data: user,
  });
};
